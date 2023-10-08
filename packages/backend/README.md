
## Installation

First run the docker:

```bash
$ docker pull mongo
```
Run the Azure Event Hubs Emulator Container: 

```bash
$ docker run -d -p 27017:27017 --name mobileApp mongo
```

## Running the app

```bash
# watch mode
$ npm run start:dev

# run the microservice in watch mode
$ npm run start:dev event-hub-consumer
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
