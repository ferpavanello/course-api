const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Student = require('../model/student')

router.get('/', (req, res) => {
  Student.find()
    .exec()
    .then((docs) => {
      console.log(docs)
      if (docs.length >= 0) {
        res.status(200).json(docs)
      } else {
        res.status(404).json({
          message: 'No entries found',
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.get('/:studentId', (req, res) => {
  const id = req.params.studentId
  Student.findById(id)
    .exec()
    .then((doc) => {
      console.log('Student found', doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No valid entry found' })
      }
    })
})

router.post('/', (req, res) => {
  const { name, email, birthDate } = req.body
  const student = new Student({
    _id: new mongoose.Types.ObjectId(),
    name,
    email,
    birthDate,
  })

  student
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Post Student',
        createdStudent: result,
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
})

router.patch('/:studentId', (req, res) => {
  const id = req.params.studentId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Student.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result)
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

router.delete('/:studentId', (req, res) => {
  const id = req.params.studentId
  Student.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
})

module.exports = router
