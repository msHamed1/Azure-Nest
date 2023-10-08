FROM node:18.15.0-alpine3.16 as Builder

WORKDIR /app
COPY ./packages/frontend/ .

RUN npm  install
RUN npm run build

FROM nginx:1.21
WORKDIR /usr/src/app

COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 4002

CMD ["nginx", "-g", "daemon off;"]