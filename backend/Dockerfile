# --- Build Stage ---
# Use an official Maven image which has both Maven and a JDK.
# We name this stage 'builder'
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the pom.xml to download dependencies first, leveraging Docker cache
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy the rest of your application's source code
COPY src ./src

# Build the application, skipping tests. The JAR will be in /app/target/
RUN mvn package -DskipTests

# --- Runtime Stage ---
# Use a slim, secure JRE-only image for the final container
FROM eclipse-temurin:21-jre-alpine

# Set the working directory
WORKDIR /app

# Copy the executable JAR from the 'builder' stage
COPY --from=builder /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that the application runs on
EXPOSE 8080

# The command to run the application
CMD ["java", "-jar", "app.jar"] 