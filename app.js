const express = require("express");
const app = express();
const connectDB = require('./db/connect')
require('dotenv').config();
const notFound = require('./middleware/notFound')

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const countries = require("./routes/countries");
const cities = require("./routes/cities");
const events = require("./routes/events");
const auth = require("./routes/auth");

app.set('trust proxy', 1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


app.use("/api/countries", countries);
app.use("/api/cities", cities);
app.use("/api/events", events);
app.use("/api/auth", auth);

app.use(notFound)

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, () => console.info(`Server has started on port ${PORT}`));
    } catch(error) {
        console.log(error)
    }
}

start();