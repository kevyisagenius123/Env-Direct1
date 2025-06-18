# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-21 AS builder

# Set the working directory in the Maven container
WORKDIR /usr/src/app

# Copy the pom.xml file to leverage Docker cache layers
# This assumes pom.xml is in the same directory as the Dockerfile (backend/)
COPY pom.xml .

# Optional: Download dependencies first to optimize caching if your pom.xml doesn't change often but sources do
# RUN mvn dependency:go-offline

# Copy the rest of your backend source code
# This assumes src is in backend/src relative to the Dockerfile's location
COPY src ./src

# Package the application. The JAR will be in /usr/src/app/target/
# -DskipTests is added to speed up the build if tests are not needed for the container image
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
# Use a slim JRE image for a smaller final container
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# Copy the executable JAR file from the builder stage
# This path (/usr/src/app/target/) is where Maven in the builder stage places the JAR
# Ensure 'backend-0.0.1-SNAPSHOT.jar' matches the actual JAR name from your pom.xml
COPY --from=builder /usr/src/app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port that Spring Boot runs on (default is 8080)
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"] 