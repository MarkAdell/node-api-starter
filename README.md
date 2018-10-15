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
$ npm run start:dev
```
To view logs
```bash
$ pm2 logs
```

Run jest tests
```bash
$ npm run test
```

Create a new migration
```bash
$ knex migrate:make <migration_name>
```

Run knex latest migrations
```bash
$ npm run migrate:dev
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
