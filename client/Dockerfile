FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build


# FROM caddy:2.7.4-alpine

# COPY --from=build /app/dist /srv
# COPY ./Caddyfile /etc/caddy/Caddyfile


FROM nginx:1-alpine-slim

COPY ./nginx/default.conf /etc/nginx/conf.d
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# FROM node:18-alpine

# WORKDIR /app
# COPY --from=build /app/dist .
# RUN npm install -g serve
# EXPOSE 3000
# CMD ["serve", "-s", "."]
