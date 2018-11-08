#! /bin/bash
kill -9 $(lsof -t -i:8532)

export page_access_token=<PAGE_ACCESS_TOKEN> 
export port=<SERVER_PORT>
export subscriber_psid=<PSID>

rm -rf ./www/*
cp -r <PATH_TO_REPORTS_FOLDER>/reports/* ./www/

npm install
node app.js