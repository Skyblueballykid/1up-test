const express = require("express");
const router = require('express-promise-router')();
const functions = require('./functions');

router.get('/', function(req, res) {  
    try {
    functions.getToken();
    } catch(err) {
        next(err);
    }
    
    res.send('Token created');
    });

module.exports = router;