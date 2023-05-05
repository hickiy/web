FROM nginx:latest
COPY dist/ /app
COPY default.conf /etc/nginx/conf.d
