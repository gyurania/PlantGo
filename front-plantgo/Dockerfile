FROM node:16.16.0 as builder

# RUN mkdir /usr/src/app
# WORKDIR /usr/src/app
WORKDIR /var/jenkins_home/workspace/front01/front-plantgo
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
# COPY front-plantgo/package.json /usr/src/app/package.json
# COPY ./package.json ./

ARG JAR_FILE=front-plantgo/package.json
CMD ["ls", "-al"]
COPY ${JAR_FILE} ./


RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent
# COPY front-plantgo/. /usr/src/app
COPY /front01/front-plantgo .
RUN npm run build

# Nginx
FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx
COPY ./sites-available/default /etc/nginx/conf.d

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]