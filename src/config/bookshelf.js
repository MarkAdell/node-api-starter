const config = require('./config.js');

const dbConfig = require('../../knexfile.js')[config.env];

const knex = require('knex')(dbConfig);

module.exports = require('bookshelf')(knex);
