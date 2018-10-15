# Node-REST-API-Starter

## Requirements
[Node.js 8](https://nodejs.org/en/)

## Getting Started
Clone the repository, install the dependencies.
```bash
$ git clone git@github.com:MarkAdell/node-api-starter.git

$ cd node-api-starter

$ npm install
```

### Required setup
- Install `pm2` and `knex` globally.
- Choose your relational database of choice, create a database.
- Create the `.env` file and fill it with your environment variables, check `.env.example` to check the required environment varables for this starter.

To run the server
```bash
$ npm run start
```
In watch mode
```bash
$ npm run start:watch
```

Run jest tests
```bash
$ npm run test
```

Run knex latest migrations
```bash
$ npm run migrate
```

To rollback
```bash
$ npm run rollback
```

## Todo

- [ ] Switch to typescript.
- [ ] API docs.

## License

node-api-starter is under [MIT License](LICENSE).
