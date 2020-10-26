const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Course = require('../model/course')

router.get('/', (req, res) => {
  Course.find()
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

router.get('/:courseId', (req, res) => {
  const id = req.params.courseId
  Course.findById(id)
    .exec()
    .then((doc) => {
      console.log('Course found', doc)
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No valid entry found' })
      }
    })
})

router.post('/', (req, res) => {
  const { title, description } = req.body
  const course = new Course({
    _id: new mongoose.Types.ObjectId(),
    title,
    description,
  })

  course
    .save()
    .then((result) => {
      console.log(result)
      res.status(201).json({
        message: 'Post Course',
        createdCourse: result,
      })
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      })
    })
})

router.patch('/:courseId', (req, res) => {
  const id = req.params.courseId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }
  Course.update({ _id: id }, { $set: updateOps })
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

router.delete('/:courseId', (req, res) => {
  const id = req.params.courseId
  Course.remove({ _id: id })
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
