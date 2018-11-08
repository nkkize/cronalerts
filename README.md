# cron job alerts to fbm

## Dependencies
Make sure you're running at least npm 2.2.1 and Node 8.0.0.

## Environment Variables

```bash
#service listen port
port=${serverPort}
#The FBM page access token
page_access_token=${page_access_token}
# The psid of the subscriber to the alerts
subscriber_psid=${subscriber_psid}

```
## Running the application
Make sure you have set the correct env vaiables in start.sh file and run:
```bash
./start.sh
```