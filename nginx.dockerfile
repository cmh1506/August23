FROM nginx:alpine
LABEL author="Claus Heinrich"
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf