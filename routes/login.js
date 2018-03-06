var express = require('express');
const axios = require('axios');
var request =  require('request');
var local = require('localStorage');

module.exports = function(app){



  app.post('/filemaker-login', function(req, res, next) {
      var database  = decodeURIComponent(req.body.solution),
          address  = decodeURIComponent(req.body.server),
          username = decodeURIComponent(req.body.user),
          password = decodeURIComponent(req.body.password),
          encodeBase64 = new Buffer('admin:cityproject').toString("base64");


    //  axios.post(`https://${address}/fmi/rest/api/auth/${database}`, {
          // 'user': decodeURIComponent(req.body.user),
          // 'password': decodeURIComponent(req.body.password),
          // 'layout': decodeURIComponent(req.body.layout)
      //
      // }).then(response => {

     return axios({
          url: `https://fm109.beezwax.net/fmi/data/v1/databases/cityProject/sessions`,
          method: "POST",
          headers: {
            'Authorization': 'Basic ' + encodeBase64,
            'Content-type': 'application/json'
          }
      }).then(response => {
        console.log('RECEIVED', response.headers);
        response.data.headers = response.headers;
        res.send(response.data);
      }).catch(err => {
          console.log('here');
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
