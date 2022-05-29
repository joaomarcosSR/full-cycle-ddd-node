FROM node:15

EXPOSE 3000

WORKDIR /usr/src/app

RUN chmod -R 777 /usr/src/app/ && \
    apt-get update && apt-get install -y wget

RUN npm install