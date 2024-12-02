FROM node:22.5-alpine

WORKDIR /app
ARG NODE_ENV=production
COPY ./package*.json ./
RUN npm install
COPY ./src src/
COPY ./uploads uploads/

CMD ["npm", "run", "start_server"] 