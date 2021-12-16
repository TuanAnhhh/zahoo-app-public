FROM node:16-alpine

WORKDIR /app

RUN chown node:node /app

COPY --chown=node:node package*.json ./

USER node

RUN npm install --production

COPY --chown=node:node . .

EXPOSE 8080

CMD ["npm", "start"]