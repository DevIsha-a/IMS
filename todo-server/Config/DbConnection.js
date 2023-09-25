const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_LOCAL).then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.log(error);
});