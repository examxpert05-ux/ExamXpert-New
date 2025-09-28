import app from './app';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    // Handle socket events
});
