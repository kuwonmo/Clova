const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

//const  {80}= require('./config.js');
//const config = require('./config.js');
const app = express();

app.use(bodyParser.json())

app.use('/', routes);

// catch 404 and forward to error handler

app.listen(80, function() {
  console.log(`Server is running on 80 port`);
});
