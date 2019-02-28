var fs = require('fs');
var AdmZip = require('adm-zip');
const chalk = require('chalk');

const distPath = 'dist';

var zip = new AdmZip();

if (fs.existsSync(distPath)) {
  zip.addLocalFolder(distPath, './');
  zip.writeZip("./archive.zip");
}else{
  console.log(chalk.red('dist folder doesn\'t exist. Run `npm run build` first.\n'));
  process.exit(1);
}
