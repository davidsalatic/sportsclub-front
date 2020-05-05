FROM node:latest as node 
WORKDIR /sportsclub-front
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=node /sportsclub-front/dist/sportsclub-front /usr/share/nginx/html