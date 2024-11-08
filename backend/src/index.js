const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
const dbURI = process.env.DB_URL;
app.use(bodyParser.json());

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