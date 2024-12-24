const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;
const dbURI = process.env.DB_URL;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

routes(app);

mongoose.connect(dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error:', error);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


