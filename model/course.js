var mongoose = require('mongoose')

var schema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
})

const Course = mongoose.model('Course', schema)

module.exports = Course
