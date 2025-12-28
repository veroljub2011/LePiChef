const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Dozvoli zahteve sa React frontenda
    methods: ["GET", "POST", "DELETE"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer za aploud slika
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Poruke i lajkovi
let messages = [];

// Socket.io logika
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('changeUsername', (newUsername) => {
    socket.username = newUsername;

    io.emit('systemMessage', {
      id: Date.now().toString(),
      type: 'system',
      text: `${newUsername} joined the chat 👋`,
      time: Date.now()
    });
  });

  socket.emit('initMessages', messages);

  socket.on('sendMessage', (message) => {
    messages.push(message);
    io.emit('message', message);
  });

  socket.on('deleteMessage', (id) => {
    messages = messages.filter(msg => msg.id !== id);
    io.emit('delete', id);
  });

  socket.on('likeMessage', (id, username) => {
    messages = messages.map(msg => {
      if (msg.id === id) {
        msg.likes = msg.likes || [];
        if (!msg.likes.includes(username)) {
          msg.likes.push(username);
        }
      }
      return msg;
    });
    io.emit('updateLikes', { id, likes: messages.find(msg => msg.id === id).likes });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Endpoint za aploud slike
app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Pokreni server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
