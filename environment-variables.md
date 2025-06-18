# Spring Boot Environment Variables for Environment Direct

## Overview
This document lists all the environment variables needed for the Environment Direct Spring Boot application. These variables are essential for proper configuration when deploying the application to a production environment.

## Database Connection Variables
Based on the application.properties files in both backend and climate-backend, the following database connection variables are needed:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `SPRING_DATASOURCE_URL` | JDBC URL for the database connection | `jdbc:postgresql://<host>:<port>/<database>` | Yes |
| `SPRING_DATASOURCE_USERNAME` | Username for database authentication | `postgres` | Yes |
| `SPRING_DATASOURCE_PASSWORD` | Password for database authentication | `your-secure-password` | Yes |

## JPA/Hibernate Variables
The following JPA/Hibernate variables are used to configure the ORM behavior:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | Controls database schema generation | `update` (development), `validate` (production) | Optional |
| `SPRING_JPA_SHOW_SQL` | Whether to show SQL in logs | `false` | Optional |
| `SPRING_JPA_DATABASE_PLATFORM` | The database dialect | `org.hibernate.dialect.PostgreSQLDialect` | Optional |

## Spring Profile Variables
To set the active profile for the application:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `SPRING_PROFILES_ACTIVE` | Active profile for the application | `prod` | Optional |

## JWT Authentication Variables
Based on the JWT authentication implementation in the security package:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `JWT_SECRET` | Secret key for signing JWT tokens | `your-jwt-secret-key-should-be-at-least-32-characters` | Yes |
| `JWT_EXPIRATION_MS` | Token expiration time in milliseconds | `86400000` (24 hours) | Optional |

## Server Configuration Variables
For configuring the server:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `SERVER_PORT` | Port on which the server runs | `8080` | Optional |

## File Upload Variables
For configuring multipart file uploads:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `SPRING_SERVLET_MULTIPART_MAX_FILE_SIZE` | Maximum file size for uploads | `10MB` | Optional |
| `SPRING_SERVLET_MULTIPART_MAX_REQUEST_SIZE` | Maximum request size for uploads | `10MB` | Optional |

## CORS Configuration Variables
For configuring Cross-Origin Resource Sharing:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `ALLOWED_ORIGINS` | Comma-separated list of allowed origins | `https://env-direct.onrender.com,https://wonderful-boba-48e576.netlify.app` | Optional |

## H2 Console Variables (Development Only)
These variables are only needed if you want to enable the H2 console in development:

| Variable | Description | Example Value | Required? |
|----------|-------------|---------------|-----------|
| `SPRING_H2_CONSOLE_ENABLED` | Whether to enable the H2 console | `false` | Optional |
| `SPRING_H2_CONSOLE_PATH` | Path to access the H2 console | `/h2-console` | Optional |

## Summary
For a minimal production deployment, the following variables are required:

```
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<database>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
JWT_SECRET=<your-secure-jwt-secret>
SPRING_PROFILES_ACTIVE=prod
SPRING_JPA_HIBERNATE_DDL_AUTO=validate
```

For development or testing with an in-memory H2 database, you can omit the database connection variables as they are configured with defaults in the application.properties files.