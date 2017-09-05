const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

//setting up cors
app.use(cors())

//setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//root route
app.get('/', (req, res) => {
  console.log('root route rooted right', req.user)
  res.status(200).json({status: 'ok', message: 'hey, it works!'})
})

//setting up environments
const env = process.env.NODE_ENV && process.env.NODE_ENV === 'dev'
  ? 'dev'
  : 'combined'
app.use(morgan(env))

//setting up routes
app.use('/', routes)

//setting up port
app.set('port', 8000)
app.listen(app.get('port'), function() {
  console.log('Port 8000 ready and awaiting instruction.')
})
