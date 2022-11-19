FROM node:16.14-alpine

WORKDIR /app-backend

COPY package.json .

RUN npm install

COPY . .

RUN npm run predev

CMD ["npm", "start"]

EXPOSE 3001