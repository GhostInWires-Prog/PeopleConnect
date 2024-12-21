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
const UserSchemaForRegistration = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
});
const User = mongoose.model('users', UserSchema);
const RUser = mongoose.model('registrations', UserSchemaForRegistration);

// Routes

// Register Endpoint
app.post('/api/register', async (req, res) => {
  const { email, password, fullname } = req.body;

  // Validate input
  if (!email || !password || !fullname) {
    return res.status(400).send('All fields are required');
  }
console.log(RUser.email)
  try {
    // Check if user already exists in registrations
    const existingUser = await RUser.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Email is already registered');
    }
    console.log(email);

    // Create a new user using the RUser model
    const registrations = new RUser({ email, password, fullname });
    await registrations.save();
    res.status(201).send({ message: 'User registered successfully', registrations });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send({ message: 'Error saving user', error });
  }
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and Password are required');
  }

  try {
    // Check if the user exists in the registrations collection
    const user = await RUser.findOne({ email, password });



    if (!user) {
      return res.status(401).send('Invalid email or password');
    }

    // If user is found, return user data (excluding password for security)
    const { password: userPassword, ...userDetails } = user.toObject();
    res.status(200).send({ message: 'Login successful', User: user });
    const users =new User({email,password})
    await users.save();
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ message: 'Error logging in', error });
  }
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
