FROM nginx:1.21.1-alpine
MAINTAINER karlhan.cn@gmail.com

RUN mkdir -p /data/logs
VOLUME ["/data/logs"]

COPY nginx.conf.template /etc/nginx/nginx.conf
ADD dist /data/medexam/

