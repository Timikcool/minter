FROM node:14

WORKDIR /usr/src/app/client

COPY client/package.json client/yarn.lock ./

RUN yarn install

COPY client .

CMD ["yarn", "start"]
