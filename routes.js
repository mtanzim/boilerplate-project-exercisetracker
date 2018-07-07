const express = require('express');

module.exports = function () {

  const router = express.Router();
  
  router
    .get('/health-check', (req, res, next) => res.send('OK!'))
    .get('/log', (req,res,next) => {
      return res.json(req.query);
    })
    .post('/new-user', (req, res, next) => {
      return res.json(req.body);
    })
    .post('/add', (req, res, next) => {
      return res.json(req.body);
    });

  return router;

}