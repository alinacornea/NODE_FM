var express = require('express');
const axios = require('axios');
var request =  require('request');
var local = require('localStorage');

module.exports = function(app){

  app.post('/filemaker-login', function(req, res, next) {
      const database  = decodeURIComponent(req.body.solution);

     axios.post(`https://fm107.beezwax.net/fmi/rest/api/auth/${database}`, {
          'user': decodeURIComponent(req.body.user),
          'password': decodeURIComponent(req.body.password),
          'layout': decodeURIComponent(req.body.layout)
      }).then(response => {
        res.send(response.data)
      }).catch(err => {
          console.log(err)
          res.send({ err })
          })
    });

};
