FROM node:14-alpine3.10

WORKDIR /code
COPY package*.json /code/package.json

RUN npm install

COPY . /code

EXPOSE 3001

CMD ["/code/server/node ","/code/server/server.js"]