FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache libc6-compat


COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./


RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


COPY . .

EXPOSE 3000
ENV NODE_ENV=development
CMD [ "npm", "run", "dev" ]