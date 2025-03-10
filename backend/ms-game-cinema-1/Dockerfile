FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3003

CMD ["pnpm", "run", "start:prod"]
