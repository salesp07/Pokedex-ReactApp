const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const dotenv = require("dotenv")
dotenv.config();

mongoose.connect(process.env.DB_STRING);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;