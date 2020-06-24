const ghpages = require('gh-pages');

ghpages.publish('documentation', function (err) {
  console.log('error in publishing to Github Pages:', err);
});
