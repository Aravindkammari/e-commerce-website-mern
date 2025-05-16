const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongodb connected successfully');
})
.catch((err)=>console.error(err));

const port = process.eventNames.PORT || 4000;
app.listen(port, ()=>{
    console.log(`server running successfully on port ${port}`);
})

