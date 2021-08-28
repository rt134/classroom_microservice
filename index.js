const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 8000 || process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server up and runing on port: ${PORT}`)
})

app.use(express.json())
app.use(cookieParser());
app.use("/", require("./routes/index"));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},(err) => {
    if(err) return console.error(err);
    console.log('Connected to MongoDB database')
});