'use strict';

var utils = require('./utils');

var trim = require('trim');
var Sequelize = require('sequelize');

module.exports = function(models) {
  var json_attributes = ['input', 'alias'];

  var alias = {};

  alias.list = function(req, res) {
    console.log("list alias");
    models.Alias.findAll({
    attributes: json_attributes
  }).then(function(returnAlias) {
    res.json(returnAlias);
  }).catch(utils.handleError(res));
};

  alias.create = function(req, res) {
    console.log("create Alias");
    models.Alias.create({
      input: req.body.input,
      alias: req.body.alias,
    }).then(function(returnAlias) {
      res.status(201).json(returnAlias);
    }).catch(Sequelize.UniqueConstraintError, function(err) {
      console.error(err);
      res.status(422).json({
        message: err.errors[0].message,
      });
    }).catch(utils.handleError(res));
  };

  alias.show = function(req, res) {
    console.log("get Alias");

    models.Alias.findOne({
      where: {input: req.params.input}, attributes: json_attributes
    }).then(function(returnAlias) {
      if (!returnAlias) {
        returnAlias = {};
        returnAlias['input']=req.params.input;
        returnAlias['alias']=req.params.input;
      }
      res.json(returnAlias);
    }).catch(utils.handleError(res));
  };

  alias.update = function(req, res) {
      console.log("update Alias");

      models.Alias.findOne({
        where: {input: req.params.input}
      }).then(function(returnAlias) {
        if (!returnAlias) {
          things.create(req, res);
        }

        if (req.body.alias) {
          returnAlias.type = req.body.alias;
        }

        return returnAlias.save().then(function() {

          res.json(utils.filterObject(json_attributes, returnAlias));
        });
      }).catch(utils.handleError(res));
    };

  alias.destroy = function(req, res) {
   console.log("destroy Alias");

   models.Alias.destroy({
     where: {input: req.params.input}
   }).then(function(deleted) {
     res.json({
       message: 'Alias deleted.'
     });
   }).catch(utils.handleError(res));
};

  return alias;
};
