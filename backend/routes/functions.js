const express = require("express");
const axios = require("axios");
const router = require('express-promise-router')();

// TODO Store in environment variables in prod for security
const CLIENT_ID = `dbb2e596333400b55c417c0a1ac5187a`;
const CLIENT_SECRET = `e52c028bd69b7dcfa3587e343d87f13f`;

const ROOT_API_URL = `https://api.1up.health`;
const FHIR_API_URL = `https://api.1up.health/fhir`;

let email = "hello-world15";

function createUser() {
    let url = `${ROOT_API_URL}/user-management/v1/user`;
    axios.post(url, {
        "app_user_id": email,
        "client_id": `${CLIENT_ID}`,
        "client_secret": `${CLIENT_SECRET}`
    }).then((response) => {
        const data = response.data;
        console.log(data.code);
        global.code = data.code;
    });
}

function getToken(code, callback) {
    try {
    axios.post(`${FHIR_API_URL}/oauth2/token`, {
        "code": code,
        "grant_type" : "authorization_code",
        "client_id": `${CLIENT_ID}`,
        "client_secret": `${CLIENT_SECRET}`
    }).then((response) => {
        const data = response.data;
        console.log(data);
        callback(data.access_token);
        console.log("Token String:", data.access_token);
    })} catch(err){
        console.log(err)
    };
}

exports.createUser = createUser;
exports.getToken = getToken;