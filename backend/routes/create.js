const express = require("express");
const router = require('express-promise-router')();
const functions = require('./functions');

router.get('/', function(req, res) {
    try {
    functions.createUser();
    } catch(err) {
        next(err);
    }

    res.send('User created successfully');
    });
      

module.exports = router;