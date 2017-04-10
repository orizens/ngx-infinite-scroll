"use strict";

require('shelljs/global');
const chalk = require('chalk');

const PACKAGE = `ngx-infinite-scroll`;
const NPM_DIR = `dist`;
const MODULES_DIR = `${NPM_DIR}/modules`;
const BUNDLES_DIR = `${NPM_DIR}/bundles`;

echo('Start building...');

rm(`-Rf`, `${NPM_DIR}/*`);
mkdir(`-p`, `./${MODULES_DIR}`);
mkdir(`-p`, `./${BUNDLES_DIR}`);

/* TSLint with Codelyzer */
// https://github.com/palantir/tslint/blob/master/src/configs/recommended.ts
// https://github.com/mgechev/codelyzer
echo(`Start TSLint`);
exec(`tslint --project ./tsconfig.json --type-check ./src/**/*.ts`);
echo(chalk.green(`TSLint completed`));

/* Aot compilation: ES2015 sources */
echo(`Start AoT compilation`);
exec(`ngc -p tsconfig-build.json`);
echo(chalk.green(`AoT compilation completed`));

/* Creates bundles: ESM/ES5 and UMD bundles */
echo(`Start bundling`);
echo(`Rollup package`);
exec(`rollup -i ${NPM_DIR}/index.js -o ${MODULES_DIR}/${PACKAGE}.js --sourcemap`, {silent: true});
exec(`node scripts/map-sources -f ${MODULES_DIR}/${PACKAGE}.js`);

echo(`Downleveling ES2015 to ESM/ES5`);
cp(`${MODULES_DIR}/${PACKAGE}.js`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);
exec(`tsc ${MODULES_DIR}/${PACKAGE}.es5.ts --target es5 --module es2015 --noLib --sourceMap`, {silent: true});
exec(`node scripts/map-sources -f ${MODULES_DIR}/${PACKAGE}.es5.js`);
rm(`-f`, `${MODULES_DIR}/${PACKAGE}.es5.ts`);

echo(`Run Rollup conversion on package`);
exec(`rollup -c rollup.config.js --sourcemap`, {silent: true});
exec(`node scripts/map-sources -f ${BUNDLES_DIR}/${PACKAGE}.umd.js`);

echo(`Minifying`);
cd(`${BUNDLES_DIR}`);
exec(`uglifyjs -c --screw-ie8 --comments -o ${PACKAGE}.umd.min.js --source-map ${PACKAGE}.umd.min.js.map --source-map-include-sources ${PACKAGE}.umd.js`, {silent: true});
exec(`node ../../scripts/map-sources -f ${PACKAGE}.umd.min.js`);
cd(`..`);
cd(`..`);

echo(chalk.green(`Bundling completed`));

rm(`-Rf`, `${NPM_DIR}/*.js`);
rm(`-Rf`, `${NPM_DIR}/*.js.map`);
rm(`-Rf`, `${NPM_DIR}/src/**/*.js`);
rm(`-Rf`, `${NPM_DIR}/src/**/*.js.map`);

cp(`-Rf`, [`package.json`, `LICENSE`, `README.md`], `${NPM_DIR}`);

echo(chalk.green(`End building`));
