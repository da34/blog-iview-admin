FROM node:alpine

RUN mkdir -p /admin
COPY ./dist/ /admin
COPY ./admin_serve.js /admin
WORKDIR /admin


RUN npm install --save connect-history-api-fallback express

CMD [ "node", "admin_serve" ]