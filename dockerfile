# docker build -t nginx:latest .
# docker run -d -p 80:80 --name nginx nginx:latest

FROM nginx:latest
COPY /docs/.vitepress/dist/ /app
COPY default.conf /etc/nginx/conf.d
RUN mkdir /credentials
VOLUME /credentials
EXPOSE 80/tcp
CMD ["nginx", "-g", "daemon off;"]