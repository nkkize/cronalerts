let request = require('request');
let localtunnel = require('localtunnel');
let logger = require('tracer').console();

const PAGE_ACCESS_TOKEN = process.env.page_access_token;
const SUBSCRIBER_PSID = process.env.subscriber_psid;
const SERVER_PORT = process.env.port;

function getLocaltunnelDomain() {

    return new Promise((resolve, reject) => {
        localtunnel(SERVER_PORT, function (err, tunnel) {
            if (err) {
                return reject(error);
            };
            let tunnelUrl = tunnel.url;
            return resolve(tunnelUrl);
        });
    });
};

function sendAlert(tunnelUrl) {
    let data;
    if (tunnelUrl) {
        let reportsUrl = tunnelUrl + '/report.html';
        data = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": SUBSCRIBER_PSID
            },
            "message": {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Hey there! Cron job completed successfully. To view reports, please click below button or visit: ${reportsUrl}`,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": reportsUrl,
                                "title": "View Report"
                            }
                        ]
                    }
                }
            }
        };

    } else {
        data = {
            "messaging_type": "RESPONSE",
            "recipient": {
                "id": SUBSCRIBER_PSID
            },
            "message": {
                "text": "Hey there! Cron job completed successfully. Please login to the server to view reports."
            }
        };
    }

    request.post({
        headers: { 'content-type': 'application/json' },
        url: 'https://graph.facebook.com/v2.6/me/messages?access_token=' + PAGE_ACCESS_TOKEN,
        form: data
    }, function (err, res, body) {
        if (err) {
            logger.error('could not send cron job alerts', err);
        } else {
            logger.info(`successfully sent cron job alerts`);
        }
    });
}

exports.sendAlertToFBM = function () {
    return getLocaltunnelDomain()
        .then(tunnelUrl => {
            return sendAlert(tunnelUrl);
        })
        .catch(err => {
            logger.error("error while exposing local server over localtunnel", err)
            logger.info("sending default alert")
            return sendAlert();
        });
};
