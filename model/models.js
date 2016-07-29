'use strict';

var databaseUri = process.env.JARVISDAT_DB || 'sqlite://development.sqlite';

var Sequelize = require('sequelize');

var database = exports.database = new Sequelize(databaseUri);

var Alias = exports.Alias = database.define('alias',
  {
    id: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    input: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: false,
    },
  },
  {
    createdAt: 'created',
    updatedAt: 'timestamp',
  });
