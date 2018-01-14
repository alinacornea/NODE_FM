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
      // }).then(res => console.log(res)).catch(err => console.log(err))
    }).then(res => {
      return axios.get('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/AllProgramsEvents', {
        headers: {
          'FM-Data-token': res.data.token
        }
      //   req.axios = axios.create({
      //    headers: {'FM-Data-token': res.data.token}
      //  });
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
        // }).then(res => console.log(res)).catch(err => console.log(err))
      }).then(res => {
        return axios.get('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/DATA_API', {
          headers: {
            'FM-Data-token': res.data.token
          }
        //   req.axios = axios.create({
        //    headers: {'FM-Data-token': res.data.token}
        //  });
        });
      }).then(response => {
                      // console.log(response.data.data[0].fieldData) //node
                      res.send(response.data)
            })
        .catch(err => {
                      console.log(err)
                      res.send({ err })
                    })
    });

    /*
    * posting data to filemaker from client side
    */

    app.post('/filemaker-data', (req, res) => {
      // /fmi/rest/api/record/:solution/:layout/:recordId
      console.log('BODY:',req.body);
      axios.put('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/DATA_API/2', {
        headers: {
          'FM-Data-token': res.data.token,
          data: req.body
        }
    });
  });
};
