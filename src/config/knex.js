const config = require('./config.js');

const dbConfig = require('../../knexfile.js')[config.env];

module.exports = require('knex')(dbConfig);
