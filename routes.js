const express = require('express');
const User = require('./models/users');
const Exercise = require('./models/exercises');
const testDate = require('./helpers/dateTest')

module.exports = function () {

  const router = express.Router();

  const exerciseFieldSelect = '_user description duration date';
  const maxLimit = 1000;
  const minDate = '1900-01-01';
  const maxDate = '3000-12-31';
  
  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .get('/log', (req,res,next) => {
      console.log(req.query._user);
      console.log(req.query.from);
      console.log(req.query.to);
      console.log(req.query.limit);

      if (req.query.from) {
        if (!testDate(req.query.from)) return next(new Error('Please provide a valid from date in yyyy-mm-dd'));
      }
      if (req.query.to) {
        if (!testDate(req.query.to)) return next(new Error('Please provide a valid from date in yyyy-mm-dd'));
      }

      Exercise
        .find({ '_user': req.query._user })
        .where('date').gt(req.query.from || minDate)
        .where('date').lt(req.query.to || maxDate)
        .limit(Number(req.query.limit) || maxLimit)
        .sort({ 'date': -1 })
        .select(exerciseFieldSelect)
        .then(exercise => res.json(exercise));
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