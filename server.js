const express = require('express');
const dotenv = require('dotenv');
const { sequelize, connectDb } = require('./config/database');
const bannerRoutes = require('./routes/banner-routes');
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const socketIO = require('socket.io');
const http = require("http");
const { initSocketServer } = require('./utils/socketServer');
const path = require("path");

dotenv.config();
const app = express();
// const server = http.createServer(app);
// initSocketServer(server)

const corsOptions = {
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes",
    headers: true,
});

app.use('/api/', apiLimiter);

app.use(express.json());
app.use('/api/v1/banner', bannerRoutes);



// const broadcastBannerUpdate = (data) => {
//     io.emit('bannerUpdate', data);
// };


connectDb().then(async () => {
    app.listen(8080, () => {
        console.log(`Server is running on port ${process.env.PORT || 8080}`);
    });
});



module.exports = { app };