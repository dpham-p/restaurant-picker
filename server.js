require('dotenv').config();

const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const cors = require('cors');
const socketio = require('socket.io');
const passport = require('passport');

const app = express();
console.log(path.resolve('./certs/server.key'));
let server;
if (process.env.NODE_ENV === 'production') {
  console.log('Production server running...');
  server = http.createServer(app);
} else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('./certs/server.key')),
    cert: fs.readFileSync(path.resolve('./certs/server.cert'))
  };
  console.log('Development server running...');
  server = https.createServer(certOptions, app);
}

// Initialize Express middleware for JSON objects and initialize Passport
app.use(express.json());
app.use(passport.initialize());

//
app.use('/', require('./routes/authRouter'));

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
