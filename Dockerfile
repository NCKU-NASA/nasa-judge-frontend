#FROM node:18-bookworm as builder
FROM node:latest as builder

COPY . /src
WORKDIR /src
RUN npm ci --legacy-peer-deps && npm run build --if-present


FROM nginx:latest as release

COPY --from=builder /src/dist /var/www/html
