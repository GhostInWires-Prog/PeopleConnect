const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// CORS Middleware
app.use(cors({
  origin: 'http://localhost:4200',  // Allow Angular app
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  credentials: true // Allow cookies if needed
}));

app.use(express.json()); // For parsing JSON request bodies
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Login Details', { dbName: 'UserLogin' })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Schema and Model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('user', UserSchema);

// Routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and Password are required');
  }

  // Save user data
  try {
    const user = new User({ email, password });
    await user.save();
    res.status(201).send({ message: 'User saved successfully', user });
  } catch (error) {
    res.status(500).send({ message: 'Error saving user', error });
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
