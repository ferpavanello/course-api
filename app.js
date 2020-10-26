const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const courseRoutes = require("./routes/courses");
const studentRoutes = require('./routes/students')

const uri =
  'mongodb+srv://temp:temp@cluster0.b3j3u.mongodb.net/course_platform?retryWrites=true&w=majority'

mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected with atlas'))

app.use(cors())
app.use(bodyParser.json())

app.use("/course", courseRoutes);
app.use("/student", studentRoutes);

module.exports = app
