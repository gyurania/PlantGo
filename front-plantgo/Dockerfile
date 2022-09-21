FROM node:16.16.0 as builder

WORKDIR /var/jenkins_home/workspace/front01/front-plantgo
# ARG JAR_FILE=front-plantgo/package.json
# # COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
# COPY ${JAR_FILE} ./


# COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
COPY front-plantgo/package.json ./


RUN npm install --silent

# ARG JAR_FILE=front-plantgo
# COPY ${JAR_FILE} .

COPY front-plantgo .

RUN npm run build

# Nginx
FROM nginx:latest

COPY --from=builder /var/jenkins_home/workspace/front01/front-plantgo/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]