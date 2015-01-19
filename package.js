Package.describe({
  name: 'cottz:iron-query',
  summary: 'simple package to add and take parameters in the route',
  version: '1.2.0',
  git: 'https://github.com/Goluis/cottz-iron-query.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');

  api.use('tracker');
  api.use('ui');
  api.use('iron:location@1.0.4');
  api.use('iron:url@1.0.4');

  api.addFiles('iron_query.js', 'client');
});