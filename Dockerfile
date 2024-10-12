#FROM node:18-bookworm as builder
FROM node:latest as builder

WORKDIR /src
COPY package*.json .
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build --if-present

FROM nginx:latest as release

COPY --from=builder /src/dist /var/www/html
