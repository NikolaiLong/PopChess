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
io.on('connection', socket => {
  console.log('a user connected');

  socket.on('enterQueue', () => {
    console.log('entered queue');



  })

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

// // Port Connection for HTTP Requests
// app.listen(port, () => {
//   console.log(`listening on *:${port}`);
// });
