const express = require("express");
const axios = require("axios");
const router = express.Router();

// TODO: Store in environment variables in prod for security
const CLIENT_ID = `dbb2e596333400b55c417c0a1ac5187a`;
const CLIENT_SECRET = `e52c028bd69b7dcfa3587e343d87f13f`;

const ROOT_API_URL = `https://api.1up.health`;
const FHIR_API_URL = `https://api.1up.health/fhir`;

let email = "hello-world6";

function createUser(callback) {
    let url = `${ROOT_API_URL}/user-management/v1/user`;
    axios.post(url, {
        "app_user_id": email,
        "client_id": `${CLIENT_ID}`,
        "client_secret": `${CLIENT_SECRET}`
    }).then((response) => {
        const data = response.data;
        console.log(data.code);
        var code = data.code;
        
    });
}

exports.createUser = createUser;