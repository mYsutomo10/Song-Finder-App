const express = require('express');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/songs', songRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;

afterAll(() => {
    app.close(); // Replace with the correct teardown method for your app
});