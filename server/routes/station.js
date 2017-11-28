var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET running trains due to serve the selected station. */
router.get('/:station_name/get-trains', (req, res, next) => {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML?StationDesc=' + req.params.station_name, (err, data) => {
    let json = xmlParser.parse(data.body)
    res.send(json.ArrayOfObjStationData.objStationData)
  })
})

module.exports = router
