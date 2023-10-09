FROM node:18.15.0-alpine3.16 as Builder

WORKDIR /app

COPY ./packages/frontend/ .

RUN npm install
COPY ./packages/frontend/ .
RUN npm run build

FROM nginx:1.21
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ] 

#CMD ["nginx", "-g", "daemon off;"]