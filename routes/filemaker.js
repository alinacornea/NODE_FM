var express = require('express');
const axios = require('axios');

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
            'FM-Data-token': res.data.token
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

    app.post('/filemaker-data', (req, res) => {
      // /fmi/rest/api/record/:solution/:layout/:recordId
      console.log('BODY:',req.body.NODE);
      axios.post('https://fm107.beezwax.net/fmi/rest/api/auth/FilemakerProject_nov25', {
          'user': 'staffer',
          'password': 'test123',
          'layout': 'DATA_API'
      }).then(res => {
     return  axios.post('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/DATA_API', {
        headers: {
          'FM-Data-token': res.data.token
        },
        body:{
          "data": {
            "TEST": req.body.NODE
          }
        }
      });
    }).then(response => {
      console.log(respose)
    }).catch(err => {console.log(err)})
  });
};
