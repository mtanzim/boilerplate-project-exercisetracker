const express = require('express');
const User = require('./models/users');
const Exercise = require('./models/exercises');

module.exports = function () {

  const router = express.Router();
  
  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .get('/log', (req,res,next) => {
      return res.json(req.query);
    })
    .post('/new-user', (req, res, next) => {
      const user = new User(req.body);
      user
        .save()
        .then( user => res.json(user))
        .catch( err => next (err));
      })
      .post('/add', (req, res, next) => {
        const exercise = new Exercise(req.body);
        exercise
        .save()
        .then( exercise => res.json(exercise))
        .catch( err => next (err)); 
    });

  return router;

};