FROM node:alpine
WORKDIR /app
COPY . .
COPY tsconfig.json .
COPY package.json .
EXPOSE 8080
ENV DATABASE_URL="URL Banco de Produção/deploy"
RUN yarn install
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn build
CMD [ "node", "dist/server.js" ]
