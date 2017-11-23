var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:stationcode/get-running-trains', function(req, res, next) {
  // console.log(req, 'request obj')
  request('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins?StationCode=' + req.params.stationcode + '&NumMins=90', (err, data) => {
    let json = xmlParser.parse(data.body)
    console.log(json)
    res.send(json.ArrayOfObjStationData.objStationData)
  })
})

module.exports = router
