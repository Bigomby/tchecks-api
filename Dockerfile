FROM node:slim

COPY  . /app/

WORKDIR /app/

RUN yarn install

ENTRYPOINT ["yarn" , "start"]
