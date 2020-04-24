// Imports
const express = require('express');
const webRoutes = require('./routes/web');
const cors = require('cors');

// Express app creation
const app = express();

// Configurations
const appConfig = require('./configs/app');

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req,res, next){
  res.header('Acces-Control-Allow-Origin', '*');
  res.header('Acces-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Acces-Control-Allow-Headers', 'Content-Type');
  next();

})
app.use(cors());

// Routes
app.use('/', webRoutes);

// App init
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
