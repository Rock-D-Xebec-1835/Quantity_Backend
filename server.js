require("./config/db");
require("dotenv").config();
const express = require('express');
const cors = require('cors');

const unitsRouter = require('./routes/units');
const calculateoute = require('./routes/calculate');
const historyRoute = require('./routes/history');
const authRoute = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/units', unitsRouter);
app.use('/calculate', calculateoute);
app.use('/history', historyRoute);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});