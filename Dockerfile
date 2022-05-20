FROM node:slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD [ "npm","run start:dev" ]