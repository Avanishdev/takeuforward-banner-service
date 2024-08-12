const { Server } = require("socket.io");
let io;

const initSocketServer = (server) => {
    io = new Server(server, {
        cors: {
            methods: ["GET", "POST"]
        }
    });
    console.log("Socket.IO server initialized");

    io.on('error', (err) => {
        console.error('Socket.IO error:', err);
    });

    io.on('connection', handleConnection);
};

const handleConnection = (socket) => {
    console.log('Client connected');

    socket.emit('message', { message: 'Welcome to the WebSocket server!' });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });
};

const closeSocketServer = () => {
    if (io) {
        io.close(() => {
            console.log('Socket.IO server closed');
        });
    }
};

module.exports = { initSocketServer, closeSocketServer };