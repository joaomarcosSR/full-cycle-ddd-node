FROM node:15

WORKDIR /usr/src/app

RUN chmod -R 777 /usr/src/app/ && \
    apt-get update && apt-get install -y wget

EXPOSE 3000

#RUN npm install