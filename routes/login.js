var express = require('express');
const axios = require('axios');
var request =  require('request');
var local = require('localStorage');

/* GET data listing.
*/

module.exports = function(app){

   app.post('/filemaker-login', function(req, res, next) {
     console.log(req.body);
      axios.post('https://fm107.beezwax.net/fmi/rest/api/auth/FilemakerProject_nov25', {
          'user': 'staffer',
          'password': 'test123',
          'layout': 'DATA_API'
      }).then(res => {
        return axios.get('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/DATA_API', {
          headers: {
            'FM-Data-token':res.data.token
          }
        });
      }).then(response => {
                      res.send(response.data)
            })
        .catch(err => {
                      console.log(err)
                      res.send({ err })
                    })
    });

};
