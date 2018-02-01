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

   app.post('/filemaker-update', function(req, res, next){
     const database = decodeURIComponent(req.body.solution);
     const layout = decodeURIComponent(req.body.layout);
     const field = decodeURIComponent(req.body.field);
     let data = {};
     data[`${field}`] = decodeURIComponent(req.body.data);
        return axios({
            url: `https://fm107.beezwax.net/fmi/rest/api/record/${database}/${layout}/${req.body.recordId}`,
            method: "PUT",
            headers: {
              'FM-Data-token': req.body.token,
              'Content-type':'application/json'
            },
            data: {
                data: data
              }
      }).then(response => {
          res.send(response.data)
        }).catch(err => {
          console.log('error: ', err)
        });
    });


    app.post('/filemaker-create', function(req, res, next){
      const database = decodeURIComponent(req.body.solution);
      const layout = decodeURIComponent(req.body.layout);
      const field = decodeURIComponent(req.body.field);

      let data = {};
      data[`${field}`] = decodeURIComponent(req.body.newData);

         return axios({
             url: `https://fm107.beezwax.net/fmi/rest/api/record/${database}/${layout}`,
             method: "POST",
             headers: {
               'FM-Data-token': req.body.token,
               'Content-type':'application/json'
             },
             data: {
                 data: data
               }
       }).then(response => {
         res.send(response.data)
         }).catch(err => {
              console.log('Error: ', err)
         });
     });

    app.post('/filemaker-delete', function(req, res, next){
      const database = decodeURIComponent(req.body.solution);
      const layout = decodeURIComponent(req.body.layout);
      const recordId = parseInt(decodeURIComponent(req.body.recordId), 10);
         return axios({
             url: `https://fm107.beezwax.net/fmi/rest/api/record/${database}/${layout}/${recordId}`,
             method: "DELETE",
             headers: {
               'FM-Data-token': req.body.token,
               'Content-type':'application/json'
             },
       }).then(response => {
         res.send(response.data)
         }).catch(err => {
              console.log('Error: ', err)
         });
     });


    //get record from filemaker database
    app.post('/filemaker-get', function(req, res, next){
      const database = decodeURIComponent(req.body.solution);
      const layout = decodeURIComponent(req.body.layout);
      const recordId = parseInt(decodeURIComponent(req.body.recordId), 10);

         return axios({
             url: `https://fm107.beezwax.net/fmi/rest/api/record/${database}/${layout}/${recordId}`,
             method: "GET",
             headers: {
               'FM-Data-token': req.body.token,
               'Content-type':'application/json'
             },
       }).then(response => {
         console.log('response', response.data.data)
         res.send(response.data.data)
         }).catch(err => {
                return next(err)
         });
     });

    //upload filemaker image
    app.post('/filemaker-image', function(req, res, next){
      const database = decodeURIComponent(req.body.solution);
      const layout = decodeURIComponent(req.body.layout);
      // const field = decodeURIComponent(req.body.field);
      let data = {};
      data[`NODE`] = decodeURIComponent(req.body.image);

         return axios({
             url: `https://fm107.beezwax.net/fmi/rest/api/record/${database}/${layout}`,
             method: "POST",
             headers: {
               'FM-Data-token': req.body.token,
               'Content-type':'application/json'
             },
             data: {
                 data: data
               }
       }).then(response => {
         res.send(response.data)
         }).catch(err => {
              console.log('Error: ', err)
         });
     });
};
