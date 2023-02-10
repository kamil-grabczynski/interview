FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

ARG DATABASE_URL=""
ENV DATABASE_URL $DATABASE_URL
ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ENV DATABASE_URL "postgresql://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?schema=public"


CMD ["npm", "run", "start"]
