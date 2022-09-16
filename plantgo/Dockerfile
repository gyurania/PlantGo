FROM openjdk:8
WORKDIR /var/jenkins_home/workspace/spring01/plantgo
EXPOSE 8080
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]