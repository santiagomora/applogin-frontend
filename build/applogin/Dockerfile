FROM node:16.0.0-alpine3.13

COPY run_container.sh /
RUN chmod +x /run_container.sh

COPY .env /home/node/.env

VOLUME /home/node
WORKDIR /home/node
ENTRYPOINT ["/run_container.sh"]
