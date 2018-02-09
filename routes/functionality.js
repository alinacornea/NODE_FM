const express = require('express');
const axios = require('axios');
const request =  require('request');
const local = require('localStorage');

removeDuplicates = (data) =>{
  let seen = {};
  data = data.map((item) => item.toString().trim().replace(/\s(?=\s)/g,''));
  return data.filter((item) => {
    return (seen.hasOwnProperty(item) || item === '') ? false : (seen[item] = true);
  });
}

module.exports = function(app){
  app.post('/getvalue', (req, res, next) => {
    const server = decodeURIComponent(req.body.base.server);
    const database = decodeURIComponent(req.body.base.solution);
    const layout = decodeURIComponent(req.body.base.layout);
    const recordId = parseInt(req.body.recordId, 10);

    return axios({
        url: `https://${server}/fmi/rest/api/record/${database}/${layout}/${recordId}`,
        method: "GET",
        headers: {
          'FM-Data-token': req.body.base.token,
        }
    }).then(response => {
        let funct = response.data.data[0].fieldData.FUNCTION;
        if(funct === 'remove duplicates'){
          let responseData = response.data.data
          let data = response.data.data[0].fieldData.SendNODE.split('\r');
          let send = removeDuplicates(data);
          //send back to filemaker the result
          return axios({
                 url: `https://${server}/fmi/rest/api/record/${database}/${layout}/${recordId}`,
                 method: "PUT",
                 headers: {
                   'FM-Data-token': req.body.base.token,
                   'Content-type':'application/json'
                 },
                 data: {
                     data: {NODE: send.join('\r')}
                   }
          }).then(response => {
            res.json({
              data: responseData,
              func: 'remove duplicates',
              result: send
             });
          }).catch(err => {console.log(err)});
        }
      }).catch(err => {
          if (err.response.data.errorCode === '101'){
            return res.json({
              message: 'Check the form for errors.',
              errors: {
                recordId: 'Record is missing!'
              }
            });
          }
      });
  });

  //get portal information for each program
  app.post('/portal/:recordId', (req, res, next) => {
    const recordId = parseInt(req.params.recordId, 10);
    const server = decodeURIComponent(req.body.server);
    const database = decodeURIComponent(req.body.solution);
    const layout = "PORTAL";
    return axios({
        url: `https://${server}/fmi/rest/api/record/${database}/${layout}/${recordId}`,
        method: "GET",
        headers: {
          'FM-Data-token': req.body.token,
        }
    }).then(response => {
        res.send(response.data.data)
      })
      .catch(err => {
        console.log(err)
        res.send({ err })
      })
  });

};
