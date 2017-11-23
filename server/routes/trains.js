var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/running', function(req, res, next) {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML', (err, data) => {
    let json = xmlParser.parse(data.body)
    res.send(json.ArrayOfObjTrainPositions.objTrainPositions)
  })
})

module.exports = router
