const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan')

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();


//custom middleware
function dateLogger(req, res, next) {
  console.log(new Date().toISOString());

  next();
}

//write a middleware function that logs the  HTTP method and the URL visited by the client
//should log to the console something that looks like this: GET / or GET /api/hubs
function logger(req, res, next) {
  console.log(`The logger: [${new Date().toISOString()}] ${req.method} to ${req.url} ${req.get('Origin')}`)

  next();
}

function gateKeeper(req, res, next) {
  //new way of reading data sent by the client
  const password = req.headers.password || '';
  if (password === '' || undefined){
    res.status(401)

  } else if(password.toLowerCase() === 'melon'){
    next();
  
  } else {
  
    res.status(400).json({ you: "please provide a password"})
  }
}
//enter the password: melon in the headers as a key value pair


//global middleware

server.use(helmet());//third party middleware (this one hides that we're using express)

server.use(express.json()); //built-in middleware
server.use(gateKeeper);
server.use(dateLogger);

server.use(logger);

server.use(morgan('dev'));



// server.get('api/hubs', (req, res) => {
//   res.send('Logger done!')
// })


server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
