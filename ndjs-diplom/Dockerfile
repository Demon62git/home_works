FROM node:22.5-alpine as builder

WORKDIR /app  
COPY ./package*.json ./
RUN npm install
COPY ./tsconfig*.json ./ 
COPY ./src src/
RUN npm run build

FROM node:22.5-alpine

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY ./public ./public

CMD node dist/main.js