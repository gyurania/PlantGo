FROM openjdk:8
EXPOSE 8080
ARG JAR_FILE=plantgo/build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]