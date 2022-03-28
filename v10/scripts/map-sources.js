const sorcery = require('sorcery');

var argv = require('yargs')
  .alias('f', 'file')
  .argv;

sorcery.load(argv.file).then(function(chain) {
  chain.write();
});
