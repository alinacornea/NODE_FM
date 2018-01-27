var express = require('express');
const axios = require('axios');
var request =  require('request');
var local = require('localStorage');

/* GET data listing.
*/

module.exports = function(app){
  app.get('/programs', function(req, res, next) {
    axios.post('https://fm107.beezwax.net/fmi/rest/api/auth/FilemakerProject_nov25', {
        'user': 'staffer',
        'password': 'test123',
        'layout': 'AllProgramsEvents'
    }).then(res => {

     return axios.get('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/AllProgramsEvents', {
        headers: {
          'FM-Data-token': res.data.token
        }
      });
    }).then(response => {
                    // console.log(response.data.data)
                    res.send(response.data.data)
          })
      .catch(err => {
                    console.log(err)
                    res.send({ err })
                  })
  });

   app.get('/filemaker', function(req, res, next) {
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

   /*
    * posting or modifying data to filemaker from client side
    */

   app.post('/filemaker-data', function(req, res, next){

      axios.post('https://fm107.beezwax.net/fmi/rest/api/auth/FilemakerProject_nov25', {
          'user': 'staffer',
          'password': 'test123',
          'layout': 'DATA_API'
      }).then(res => {
        return axios({
            url: 'https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/DATA_API/2',
            method: "PUT",
            headers: {
              'FM-Data-token': res.data.token,
              'Content-type':'application/json'
            },
            data: {
                data: {
                  NODE_R: `${decodeURIComponent(req.body.NODE)}`
                }
              }
          });
      }).then(res => {
        console.log('response SUCCESS ', res.data)
        }).catch(err => {
                      console.log('error', err)
        });
    });

   app.post('/filemaker-create', function(req, res, next){

      axios.post('https://fm107.beezwax.net/fmi/rest/api/auth/FilemakerProject_nov25', {
          'user': 'staffer',
          'password': 'test123',
          'layout': 'DATA_API'
      }).then(res => {
        return axios({
            url: 'https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/DATA_API/2',
            method: "PUT",
            headers: {
              'FM-Data-token': res.data.token,
              'Content-type':'application/json'
            },
            data: {
                data: {
                  NODE_R: `${decodeURIComponent(req.body.NODE)}`
                }
              }
          });
      }).then(res => {
        console.log('response SUCCESS ', res.data)
        }).catch(err => {
                      console.log('error', err)
        });
    });

};
