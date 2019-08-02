require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const passport = require('passport');
const passportInit = require('./lib/passportInit');

const app = express();

//  Connect Database
connectDB();

let server;
if (process.env.NODE_ENV === 'production') {
  // Run server regularly
  console.log('Production server running...');
  server = http.createServer(app);
} else {
  // Load certificates to run server in https locally
  const certOptions = {
    key: fs.readFileSync(path.resolve('./certs/key.pem')),
    cert: fs.readFileSync(path.resolve('./certs/cert.pem'))
  };
  console.log('Development server running...');
  server = https.createServer(certOptions, app);
}

// Initialize Express middleware for JSON objects and initialize Passport
app.use(express.json());
app.use(passport.initialize());
passportInit();

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
