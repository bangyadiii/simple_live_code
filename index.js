require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on('error', (error) => {
  console.log(error);
})

db.once('connected', () => {
  console.log(`Mongo connected`);
})

const userRoutes = require('./routes/user.route');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to user\'s service for bookstore'
  })
})

app.use('/users', userRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});