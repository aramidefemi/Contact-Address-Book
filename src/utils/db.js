const mongoose = require('mongoose');
const logger = require('./logger');
const { db_uri } = require('../config/');

mongoose.Promise = global.Promise;


const dev = 'dev';
const connection = mongoose.connect(db_uri);

connection
  .then((db) => {
    logger.info(
      `Successfully connected to ${db_uri} MongoDB cluster in ${dev} mode.`
    );
    return db;
  })
  .catch((err) => {
    if (err.message.code === 'ETIMEDOUT') {
      logger.info('Attempting to re-establish database connection.');
      mongoose.connect(db_uri);
    } else {
      logger.error('Error while attempting to connect to database:');
      logger.error(err);
    }
  });

exports.connection;
