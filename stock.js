const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:3001', 'http://localhost:4200']
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('token', token);
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('request', (msg) => {
    const data = [
      {
        id: 1,
        name: 'Apple',
        currentPrice: (Math.random() * 100).toFixed(2),
        dailyHigh: (Math.random() * 100).toFixed(2),
        dailyLow: (Math.random() * 100).toFixed(2)
      },
      {
        id: 2,
        name: 'Microsoft',
        currentPrice: (Math.random() * 100).toFixed(2),
        dailyHigh: (Math.random() * 100).toFixed(2),
        dailyLow: (Math.random() * 100).toFixed(2)
      },
      {
        id: 3,
        name: 'Tesla',
        currentPrice: (Math.random() * 100).toFixed(2),
        dailyHigh: (Math.random() * 100).toFixed(2),
        dailyLow: (Math.random() * 100).toFixed(2)
      },
      {
        id: 4,
        name: 'Amazon',
        currentPrice: (Math.random() * 100).toFixed(2),
        dailyHigh: (Math.random() * 100).toFixed(2),
        dailyLow: (Math.random() * 100).toFixed(2)
      }
    ]
    io.emit('response', data);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});