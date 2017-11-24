var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:station_name/:time', function(req, res, next) {
  request('http://localhost:3001/trains/' + req.params.from + '', () => {

  })
})

module.exports = router
