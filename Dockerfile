FROM node:alpine
WORKDIR /app
COPY . .
COPY tsconfig.json .
COPY package.json .
EXPOSE 3333
RUN yarn install
RUN yarn prisma generate
RUN yarn build
CMD [ "node", "dist/server.js" ]