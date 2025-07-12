# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

RUN npm install ts-node typescript @types/node



COPY . .

RUN npx prisma generate


EXPOSE 3000

CMD ["npm", "run", "dev"]