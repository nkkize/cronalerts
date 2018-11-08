const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

let logger = require('tracer').console();
let alerts = require('./alerts');

const SERVER_PORT = process.env.port;

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/www/')));

// Listen and send alert to FBM
app.listen(SERVER_PORT || 8532, function () {
    logger.info("Live at Port 8532");
    alerts.sendAlertToFBM();
});
