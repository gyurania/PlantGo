FROM node:16.16.0 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
COPY front-plantgo/package.json /usr/src/app/package.json
RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

COPY front-plantgo/. /usr/src/app
RUN npm run build

FROM nginx:latest

# COPY --from=build-stage /var/jenkins_home/workspace/deploytest/testproject_react/build /usr/share/nginx/html

RUN rm -rf /etc/nginx/conf.d
# COPY conf /etc/nginx
COPY ./sites-available/default /etc/nginx/conf.d

COPY --from=builder /usr/src/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]