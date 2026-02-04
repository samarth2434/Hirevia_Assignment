package com.example.authbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@Profile("mock") // Only active when 'mock' profile is enabled
public class MockSecurityConfig {

    @Bean
    public SecurityFilterChain mockFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/health").permitAll()
                .requestMatchers("/api/auth/**").permitAll() // Mock auth endpoints
                .requestMatchers("/api/user/**").hasRole("USER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/submit-assessment").hasRole("USER")
                .requestMatchers("/api/my-assessments").hasRole("USER")
                .requestMatchers("/api/assessments").hasRole("ADMIN")
                .requestMatchers("/api/assessment/**").hasRole("ADMIN")
                .requestMatchers("/api/assessment-stats").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .httpBasic(httpBasic -> {}) // Enable basic auth for testing
            .formLogin(form -> form.disable());

        return http.build();
    }

    @Bean
    public UserDetailsService mockUserDetailsService() {
        UserDetails user = User.builder()
            .username("testuser")
            .password(passwordEncoder().encode("password123"))
            .roles("USER")
            .build();

        UserDetails admin = User.builder()
            .username("admin")
            .password(passwordEncoder().encode("admin123"))
            .roles("USER", "ADMIN")
            .build();

        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(
            "http://localhost:3000", 
            "http://localhost:3001", 
            "http://localhost:3002",
            "https://*.vercel.app",
            "https://*.netlify.app"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}