'use strict';

var Sequelize = require('sequelize');
var models = require('../model/models');

var Promise = Sequelize.Promise;

var Alias = models.Alias;

namespace('db', function() {

  desc('Create tables');
  task('create', {async: true}, function() {
    console.log('Create tables');

    models.database.sync().then(complete);
  });

  desc('Insert seed data');
  task('seed', {async: true}, function() {
    console.log('Insert seed data');

    var p = [];

    p.push(Alias.bulkCreate([
      {input: '040FA7E2704D81', alias: 'tvluke' }
    ]));

    Promise.all(p).then(complete);
  });

  desc('Drop database');
    task('drop', {async: true}, function() {
    console.log('Drop tables');

    Promise.each([Alias], function(table) {
      return table.drop();
    }).then(complete);
  });
});
