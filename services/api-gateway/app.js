const express = require('express');
const cors = require('cors');
const songRoutes = require('./routes/songRoutes');
const { errorHandler } = require('../error-handler-service-errorHandler');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/songs', songRoutes);

app.listen(process.env.SONG_SERVICE_PORT, () =>
    console.log('Song service running on port ${process.env.SONG_SERICE_PORT}')
);