# API Authentication 

*API authentication is the process of verifying the identity of clients accessing your APIs.*

## Why API Authentication Matters

- Security Benefits
    - Access Control: Restrict API access to authorized users only
    - Data Protection: Safeguard sensitive information from unauthorized access
    - Identity Verification: Ensure users are who they claim to be

- Business Benefits
    - Usage Analytics: Track API usage by user/application
    - Monetization: Implement usage-based billing models
    - Compliance: Meet regulatory requirements (GDPR, LGPD, HIPAA, etc.)

## Authentication Methods 

*Different authentication methods serve different use cases.*

| Method	| Best For	| Complexity | Security Level
| -------- | ------- | ------- | ------- |
| Session-Based | Traditional web apps | Low | Medium
| JWT (Token-Based) | SPAs, Mobile Apps | Medium | High
| API Keys | Server-to-Server | Low | Low - Medium
| OAuth 2.0 | Third-party access | High | Very High

## Session Based Authentication

*Session-based authentication uses cookies to maintain user state.*

## Token Based Authentication (JWT)

*JSON Web Tokens (JWT) provide a stateless authentication mechanism that's compact and self-contained.*

*Unlike session-based authentication, token-based authentication (JWT) doesn't require a server to store session data. This makes it ideal for stateless API architecture and microservices.*

## Basic Authentication

*HTTP Basic authentication uses encoded credentials in the Authorization header.*

## OAuth 2.0 Authentication

*OAuth 2.0 is the industry-standard protocol for authorization, enabling applications to obtain limited access to user accounts on HTTP services, delegating user authentication to the service that hosts the user account.*

- User clicks "Login with [Provider: eg. google.com or github.com]" in your app
- User is redirected to the provider's login page
- User authenticates and authorizes your app
- Provider redirects back to your app with an authorization code
- Your app exchanges the code for an access token
- Your app can now access the user's data (within the authorized scope)

## API Key Authentication

*API keys are a simple way to authenticate clients to your API.
They're best suited for server-to-server communication or when you need to identify the calling project without user context.*

### Best Practices for API Keys:

- Store keys securely (environment variables, secret management services)
- Rotate keys regularly
- Use HTTPS to prevent key exposure
- Implement rate limiting per key

## Multi-Factor Authentication (MFA)
*An extra layer of security with time-based one-time passwords (TOTP)*

## Security Best Practices

*Security is not optional when implementing authentication. Follow these best practices to protect your application and users.*

### Password Security
- Never store plain text passwords
- Enforce strong passwords 
- Implement password rotation 

### Token Security
- Use short-lived access tokens 
- Implement refresh tokens 
- Store tokens securely 

### OAuth 2.0 Security
- Use PKCE 
- Validate redirect URIs
- Store client secrets securely

### General Security
- Always use HTTPS 
- Implement rate limiting 
- Use security headers 
- Log and monitor 

#### API authentication - Security best practices:
- HTTPS Only: Always use HTTPS to encrypt data in transit
- Password Hashing: Store only hashed passwords using bcrypt or Argon2
- Token Management: Keep tokens short-lived and implement refresh tokens
- Rate Limiting: Protect against brute force attacks
- Input Validation: Validate all user inputs to prevent injection attacks
- CORS Configuration: Restrict cross-origin requests appropriately
- Secure Headers: Implement security headers like HSTS and CSP
- Audit Logging: Log authentication events for security monitoring

## HTTP Headers for Authentication

*When implementing API authentication, the HTTP headers used are crucial:*

- Authorization header: This is the standard HTTP header used for sending authentication tokens in most API authentication strategies including JWT, OAuth, and Basic Auth
- Common format: Authorization: Bearer <token> for JWT and OAuth 2.0
- Format for Basic Auth: Authorization: Basic <base64-encoded-credentials>

### Authentication Strategies for Different API Types

| API Type	| Recommended 	| Considerations 
| -------- | ------- | ------- |
| Public  | API Keys | Simple to implement, good for tracking usage |
| Service-to-Service | JWT (stateless) or Mutual TLS | Minimal overhead, high security |
| Mobile/Web | OAuth 2.0 + JWT | Good user experience, handles third-party auth |
| Single-Page Application| JWT with refresh tokens | Works well with front-end frameworks |
| IoT Device | Client certificates or API keys | Handles limited device capabilities |

## Conclusion

*Essential authentication methods for Node.js APIs. Quick recap of what we've covered:*

### Authentication Methods

- Session-based - Traditional approach using server-side sessions
- JWT Tokens - Stateless tokens for distributed systems
- OAuth 2.0 - Industry standard for third-party authentication
- API Keys - Simple authentication for server-to-server communication

### Security Essentials
- Always use HTTPS
- Hash passwords with bcrypt/Argon2
- Use short-lived tokens
- Implement rate limiting

