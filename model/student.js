var mongoose = require('mongoose')

var schema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
  },
})

const Student = mongoose.model('Student', schema)

module.exports = Student
