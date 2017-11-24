var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')
// currentTime timestamp
const currentTime = new Date().getTime()

/* GET trains listing. */
router.get('/:from/:to', (req, res, next) => {
  let direction

  switch (req.params.from) {
    case 'ARKLW':
      direction = 'northbound'
      break
    case 'SKILL':
      direction = 'southbound'
      break
  }

  request('http://localhost:3001/trains/' + req.params.from + '/' + direction + '/running', (err, data) => {
    console.log()
  })
})

module.exports = router
