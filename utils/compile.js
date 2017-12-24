const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const solc = require('solc');
const Promise = require('bluebird');

let contractsFolderPath = path.join(__dirname, '../contracts');
let abiPath = path.join(__dirname, '../abi');
let contractJson = {};
let sources = {};
let paths = [];
let fileName = '';

const read = dir =>
  fs.readdirSync(dir).reduce((files, file) =>
    fs.statSync(path.join(dir, file)).isDirectory() ? files.concat(read(path.join(dir, file))) : files.concat(path.join(dir, file)),
  []);

if (fs.existsSync(abiPath)) {
  rimraf(abiPath, () => {
    fs.mkdir(abiPath);

    (read(contractsFolderPath) || []).map(contractPath => {
      fileName = path.basename(contractPath, '.sol');
      sources = {};
      sources[path.basename(contractPath)] = fs.readFileSync(contractPath).toString();

      let compiledContract = solc.compile({sources}, 1, importFilePath => {
        let parsedImportPath = importFilePath.includes('zeppelin-solidity')
          ? path.join(__dirname, `../node_modules/${importFilePath}`)
          : path.join(__dirname, `../contracts/${importFilePath}`);

        return ({contents: fs.readFileSync(parsedImportPath).toString()})
      });

      fs.writeFileSync(path.join(abiPath, `${fileName}.json`), JSON.stringify(compiledContract.contracts[`${fileName}.sol:${fileName}`]));
    });
  })
}
