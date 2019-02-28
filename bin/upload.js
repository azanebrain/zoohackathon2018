const chalk = require('chalk');
require('dotenv').config()

// getting all the credentials and IDs from `gitlab-ci.yml` file
let REFRESH_TOKEN = process.env.REFRESH_TOKEN; 
let EXTENSION_ID = process.env.EXTENSION_ID;
let CLIENT_SECRET = process.env.CLIENT_SECRET;
let CLIENT_ID = process.env.CLIENT_ID;

if(!REFRESH_TOKEN || !EXTENSION_ID || !CLIENT_SECRET || !CLIENT_ID ) {
  console.log(chalk.red('.env variables not set or empty. See .env.sample to set up your environment.\n'));
  process.exit(1);
}

const webStore = require('chrome-webstore-upload')({
  extensionId: EXTENSION_ID,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  refreshToken: REFRESH_TOKEN
});

function upload() {
  const extensionSource = fs.createReadStream('./archive.zip');
  webStore.uploadExisting(extensionSource).then(res => {
    console.log(chalk.blue('Successfully uploaded the ZIP'));

    // call publish API on success
  }).catch((error) => {
    console.log(chalk.red(`Error while uploading ZIP: ${error}\n`));
    process.exit(1);
  });
}

function publish() {
  // publish the uploaded zip
  webStore.publish().then(res => {
    console.log(chalk.blue('Successfully published the newer version'));
  }).catch((error) => {
    console.log(chalk.red(`Error while publishing uploaded extension: ${error}\n`));
    process.exit(1);
  });
}