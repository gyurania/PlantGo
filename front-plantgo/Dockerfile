FROM node:16.16.0 as builder

WORKDIR /app

# COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>
COPY package.json ./
RUN npm install --silent

COPY . .
RUN npm run build

# Nginx
FROM nginx:latest
RUN mkdir /app

COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN pwd
RUN rm -rf /usr/share/nginx/html/*
RUN pwd
COPY --from=builder ./app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]