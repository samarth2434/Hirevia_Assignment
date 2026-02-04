# Keycloak Configuration Guide

## 1. Start Keycloak

```bash
docker-compose up keycloak
```

Access Keycloak at: http://localhost:8080
- Username: `admin`
- Password: `admin`

## 2. Create Realm

1. Click on "Create Realm"
2. Name: `demo-realm`
3. Click "Create"

## 3. Create Client

1. Go to "Clients" → "Create client"
2. Client ID: `nextjs-client`
3. Client type: `OpenID Connect`
4. Click "Next"

### Client Settings:
- **Client authentication**: ON
- **Authorization**: OFF
- **Standard flow**: ON
- **Direct access grants**: ON
- **Implicit flow**: OFF
- **Service accounts roles**: ON

### Access Settings:
- **Root URL**: `http://localhost:3000`
- **Home URL**: `http://localhost:3000`
- **Valid redirect URIs**: 
  - `http://localhost:3000/*`
  - `http://localhost:3000/api/auth/callback/keycloak`
- **Valid post logout redirect URIs**: `http://localhost:3000`
- **Web origins**: `http://localhost:3000`

## 4. Get Client Secret

1. Go to "Clients" → "nextjs-client" → "Credentials"
2. Copy the "Client secret"
3. Update your `.env.local` file with this secret

## 5. Create Roles

1. Go to "Realm roles" → "Create role"
2. Create these roles:
   - `USER` (Description: "Standard user role")
   - `ADMIN` (Description: "Administrator role")

## 6. Create Users

### User 1 (Regular User):
1. Go to "Users" → "Create new user"
2. Username: `testuser`
3. Email: `user@example.com`
4. First name: `Test`
5. Last name: `User`
6. Email verified: ON
7. Enabled: ON

#### Set Password:
1. Go to "Credentials" tab
2. Set password: `password123`
3. Temporary: OFF

#### Assign Roles:
1. Go to "Role mapping" tab
2. Assign roles → Select "USER"

### User 2 (Admin User):
1. Go to "Users" → "Create new user"
2. Username: `admin`
3. Email: `admin@example.com`
4. First name: `Admin`
5. Last name: `User`
6. Email verified: ON
7. Enabled: ON

#### Set Password:
1. Go to "Credentials" tab
2. Set password: `admin123`
3. Temporary: OFF

#### Assign Roles:
1. Go to "Role mapping" tab
2. Assign roles → Select "USER" and "ADMIN"

## 7. Configure Token Settings

1. Go to "Realm settings" → "Tokens"
2. Set these values:
   - **Access token lifespan**: 5 minutes
   - **Refresh token lifespan**: 30 minutes
   - **SSO session idle timeout**: 30 minutes
   - **SSO session max lifespan**: 10 hours

## 8. Test Configuration

### Test Users:
- **Regular User**: `testuser` / `password123`
- **Admin User**: `admin` / `admin123`

### Test URLs:
- Keycloak Admin: http://localhost:8080/admin
- Realm URL: http://localhost:8080/realms/demo-realm
- OIDC Configuration: http://localhost:8080/realms/demo-realm/.well-known/openid_configuration

## 9. Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure Web origins is set to `http://localhost:3000`
2. **Redirect Errors**: Check Valid redirect URIs includes the callback URL
3. **Token Validation Errors**: Verify the issuer URI in Spring Boot matches the realm
4. **Role Issues**: Ensure roles are properly assigned to users

### Logs:
- Check Keycloak logs: `docker-compose logs keycloak`
- Check Spring Boot logs for JWT validation errors
- Check browser network tab for authentication flow

## 10. Production Considerations

- Use proper SSL certificates
- Configure proper CORS origins
- Set secure session timeouts
- Use strong client secrets
- Enable proper logging and monitoring
- Configure backup and recovery