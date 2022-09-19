FROM openjdk:8
EXPOSE 8080
CMD ["ls", "-al"]
ARG JAR_FILE=plantgo/build/libs/plantgo-0.0.1-SNAPSHOT.jar
CMD ["ls", "-al"]
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]