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
     const server = decodeURIComponent(req.body.base.server);
     const database = decodeURIComponent(req.body.base.solution);
     const layout = decodeURIComponent(req.body.base.layout);
     const field = decodeURIComponent(req.body.field);
     let data = {};
     data[`${field}`] = decodeURIComponent(req.body.data);
        return axios({
            url: `https://${server}/fmi/rest/api/record/${database}/${layout}/${req.body.recordId}`,
            method: "PUT",
            headers: {
              'FM-Data-token': req.body.base.token,
              'Content-type':'application/json'
            },
            data: {
                data: data
              }
      }).then(response => {
        console.log(response.data);
        const data = response.data;
        res.json({
          data,
          message: 'Your record was updated succesfully.'
         });
        }).catch(err => {
          if (err.response.data.errorCode === '101'){
            return res.json({
              error: true,
              message: 'Check the form for errors.',
              errors: {
                recordId: 'Record Id is missing!'
              }
            });
          }
          if (err.response.data.errorCode === '102'){
            return res.json({
              error: true,
              message: 'Check the form for errors.',
              errors: {
                field: 'Field is missing!'
              }
            });
          }
        });
    });

    /*
     * creating new filemaker record with data inserted in the client side
     */

    app.post('/filemaker-create', function(req, res, next){
      const server = decodeURIComponent(req.body.base.server);
      const database = decodeURIComponent(req.body.base.solution);
      const layout = decodeURIComponent(req.body.layout);
      const field = decodeURIComponent(req.body.field);
      console.log(layout);
      let data = {};
      data[`${field}`] = decodeURIComponent(req.body.newData);

         return axios({
             url: `https://${server}/fmi/rest/api/record/${database}/${layout}`,
             method: "POST",
             headers: {
               'FM-Data-token': req.body.base.token,
               'Content-type':'application/json'
             },
             data: {
                 data: data
               }
       }).then(response => {
         const data = response.data;
         res.json({
           data,
           message: 'Your record was created succesfully.'
          });

         }).catch(err => {
           console.log(err.response.data);
           if (err.response.data.errorCode === '102'){
             return res.json({
               error: true,
               message: 'Check the form for errors.',
               errors: {
                 field: 'Field is missing!'
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
         });
     });

     /*
      * deleting existing filemaker record sending the id of the record
      */

    app.post('/filemaker-delete', function(req, res, next){
      const database = decodeURIComponent(req.body.base.solution);
      const server = decodeURIComponent(req.body.base.server);
      const layout = decodeURIComponent(req.body.layout);
      const recordId = parseInt(decodeURIComponent(req.body.recordId), 10);
         return axios({
             url: `https://${server}/fmi/rest/api/record/${database}/${layout}/${recordId}`,
             method: "DELETE",
             headers: {
               'FM-Data-token': req.body.base.token,
               'Content-type':'application/json'
             },
       }).then(response => {
         const data = response.data;
         res.json({
           data,
           message: 'Your record was deleted succesfully.'
          });
         }).catch(err => {
           console.log(err.response.data);
           if (err.response.data.errorCode === '101'){
             return res.json({
               error: true,
               message: 'Check the form for errors.',
               errors: {
                 recordId: 'Record is missing!'
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
         });
     });


    //get record from filemaker database
    app.post('/filemaker-get', function(req, res, next){
      const database = decodeURIComponent(req.body.base.solution);
      const server = decodeURIComponent(req.body.base.server);
      const layout = decodeURIComponent(req.body.layout);
      const recordId = parseInt(decodeURIComponent(req.body.recordId), 10);

         return axios({
             url: `https://${server}/fmi/rest/api/record/${database}/${layout}/${recordId}`,
             method: "GET",
             headers: {
               'FM-Data-token': req.body.base.token,
               'Content-type':'application/json'
             },
       }).then(response => {
         res.send(response.data.data)
         }).catch(err => {
                return next(err)
         });
     });

    //upload filemaker image
    app.post('/filemaker-image', function(req, res, next){
      const server = decodeURIComponent(req.body.base.server);
      const database = decodeURIComponent(req.body.base.solution);
      const layout = decodeURIComponent(req.body.base.layout);
      let data = {};
      data[`IMAGE`] = decodeURIComponent(req.body.image);

         return axios({
             url: `https://${server}/fmi/rest/api/record/${database}/${layout}`,
             method: "POST",
             headers: {
               'FM-Data-token': req.body.base.token,
               'Content-type':'application/json'
             },
             data: {
                 data: data
               }
       }).then(response => {
         const data = response.data;
         res.json({
           data,
           message: 'Your image was uploaded succesfully!.'
          });
         }).catch(err => {
              console.log('Error: ', err)
         });
     });
};
