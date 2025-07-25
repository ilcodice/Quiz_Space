From node:22-alpine

WORKDIR /project

RUN apk add --no-cache git

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "server"]
