var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET data listing. */
router.get('/', function(req, res, next) {
//   axios.post('https://fm107.beezwax.net/fmi/rest/api/auth/FilemakerProject_nov25', {
//     'user': 'staffer',
//     'password': 'test123',
//     'layout': 'AllProgramsEvents'
//   // }).then(res => console.log(res)).catch(err => console.log(err))
// }).then(res => {
//   return axios.get('https://fm107.beezwax.net/fmi/rest/api/record/FilemakerProject_nov25/AllProgramsEvents', {
//     headers: {
//       'FM-Data-token': res.data.token
//     }
//   });
// }).then(res => console.log(res.data.data)).catch(err => console.log(err))
//
});

module.exports = router;
