const path = require('path');

module.exports = [{
  entry: './out/head/main.js',
  output: {
    path: path.resolve(__dirname, 'script'),
    filename: 'bundle_head.js',
  },
},
{
  entry: './out/form/form_timer.js',
  output: {
    path: path.resolve(__dirname, 'script'),
    filename: 'bundle_form.js',
  },
}];