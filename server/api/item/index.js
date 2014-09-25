'use strict';

var express = require('express');
var controller = require('./item.controller');

var router = express.Router();

router.get('/', controller.index); // get everything
router.get('/:id', controller.show); // get only 1 based on id
router.post('/', controller.create); // create an item in the database
router.put('/:id', controller.update); // update an existing item
router.patch('/:id', controller.update); //
router.delete('/:id', controller.destroy); //delete a specific item

module.exports = router;