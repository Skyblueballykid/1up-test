const express = require("express");
const router = express.Router();
const functions = require('./functions');

router.get('/', function(req, res, next) {
    functions.createUser();
    res.send('User created successfully');
    });
      

module.exports = router;