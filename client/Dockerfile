FROM node:16-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

ARG REACT_APP_BASE_URL
ARG REACT_APP_PEER_PATH
ARG REACT_APP_PEER_PORT

ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
ENV REACT_APP_PEER_PATH=$REACT_APP_PEER_PATH
ENV REACT_APP_PEER_PORT=$REACT_APP_PEER_PORT
RUN npm run build

#2. Serve
FROM nginx:1.21.3-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
