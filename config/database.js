const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGO_URL}`);

        console.log(`Connected to MongoDB: ${connection.connection.host}`);
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = { connectDb };
