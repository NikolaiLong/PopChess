const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors:{
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST'],
  }
});
const cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.get('/', function(req, res) {
  res.json("hello world");
});
app.use('/user', require('./routes/user.router'));
app.use('/game', require('./routes/game.router'));

// Port Connection for Socket
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3030;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});

// Socket Interaction
const userService = require('./services/user.service');
const queue = require('./_helpers/queue');
io.on('connection', socket => {
  console.log('a user connected');

  socket.on('register', user => {
      userService.addUser(user)
          .then(() => {
              console.log('registered user');
              socket.emit('register', 'registered');
          })
          .catch(err => {
              console.log('register error');
              socket.emit('error', 'error');
          })
  });

  socket.on('login', body => {
      userService.authenticate(body.username, body.password)
          .then((user) => {
              console.log('logged in user');
              socket.emit('login', user);
          })
          .catch(err => {
              console.log('logging in error');
              socket.emit('error', 'error');
          })
  })

  socket.on('enterQueue', () => {
    queue.enQueue('hi')
        .then(() => {
          socket.emit('message', 'entered queue');
          queue.inQueue('hi')
              .then(() => {
                console.log('found match');
                socket.emit('match');
              });
        });
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});
