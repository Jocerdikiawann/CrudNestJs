FROM node:slim
WORKDIR /usr/src/app
COPY package*.json /usr/src/app
RUN npm install --only=development
COPY . .
RUN npm run build
EXPOSE ${PORT}
EXPOSE 5555
CMD ["node", "dist/main"]