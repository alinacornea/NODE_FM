var express = require('express');
const axios = require('axios');
var request =  require('request');
var local = require('localStorage');

module.exports = function(app){

  app.post('/filemaker-login', function(req, res, next) {
      const database  = decodeURIComponent(req.body.solution);
      const address  = decodeURIComponent(req.body.server);

     axios.post(`https://${address}/fmi/rest/api/auth/${database}`, {
          'user': decodeURIComponent(req.body.user),
          'password': decodeURIComponent(req.body.password),
          'layout': decodeURIComponent(req.body.layout)
      }).then(response => {
        res.send(response.data)
      }).catch(err => {
          console.log(err.response.data);
          if (err.code === "ENOTFOUND"){
            return res.json({
              error: true,
              message: 'Check the form for errors.',
              errors: {
                server: 'This server address does not exists!'
              }
            });
          }
          if (err.response.data.errorCode === '802'){
            return res.json({
              error: true,
              message: 'Check the form for errors.',
              errors: {
                solution: 'This solution does not exists!'
              }
            });
          }
          if (err.response.data.errorCode === '105'){
            return res.json({
              error: true,
              message: 'Check the form for errors.',
              errors: {
                layout: 'Layout is missing!'
              }
            });
          }
          if (err.response.data.errorCode === '212'){
            return res.json({
              error: true,
              message: 'Check the form for errors.',
              errors: {
                user: 'Invalid user account and/or password; please try again'
              }
            });
          }
      });
    });

};
