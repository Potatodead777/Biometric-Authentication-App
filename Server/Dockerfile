FROM node:19-bullseye

WORKDIR /usr/code

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "start"]