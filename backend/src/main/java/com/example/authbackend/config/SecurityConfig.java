package com.example.authbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/").permitAll() // Allow root path
                .requestMatchers("/actuator/**").permitAll()
                .requestMatchers("/health").permitAll()
                .requestMatchers("/api/user/**").hasRole("USER")
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/submit-assessment").hasRole("USER")
                .requestMatchers("/api/my-assessments").hasRole("USER")
                .requestMatchers("/api/assessments").hasRole("ADMIN")
                .requestMatchers("/api/assessment/**").hasRole("ADMIN")
                .requestMatchers("/api/assessment-stats").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            );

        return http.build();
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtAuthenticationConverter converter = new JwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwt -> {
            // Extract realm roles
            Map<String, Object> realmAccess = jwt.getClaimAsMap("realm_access");
            Collection<String> realmRoles = (Collection<String>) realmAccess.get("roles");
            
            // Extract resource roles
            Map<String, Object> resourceAccess = jwt.getClaimAsMap("resource_access");
            Collection<String> resourceRoles = List.of();
            if (resourceAccess != null && resourceAccess.containsKey("nextjs-client")) {
                Map<String, Object> clientAccess = (Map<String, Object>) resourceAccess.get("nextjs-client");
                resourceRoles = (Collection<String>) clientAccess.get("roles");
            }

            // Combine and convert to authorities
            return realmRoles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                .collect(Collectors.toList());
        });
        return converter;
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