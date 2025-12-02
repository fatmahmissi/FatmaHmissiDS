/*
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/user');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function createManager() {
  const hashedPassword = await bcrypt.hash('fatma123', 10);
  const newManager = await User.create({
    nom: 'fatma',
    login: 'fatma@gmail.com',
    password: hashedPassword,
    role: 'manager'
  });
  console.log('Manager créé:', newManager);
}

createManager();
*/

