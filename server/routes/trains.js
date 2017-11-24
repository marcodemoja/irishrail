var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:station_code/:direction/running', function(req, res, next) {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + req.params.station_code, (err, data) => {
    let json = xmlParser.parse(data.body)
    let trainsByDirection = []
    if (json.ArrayOfObjStationData.hasOwnProperty('objStationData')) {
      let data = Array.isArray(json.ArrayOfObjStationData.objStationData) ? json.ArrayOfObjStationData.objStationData : [json.ArrayOfObjStationData.objStationData]

      // pick the trains with the right direction Southbound|Northbound
      trainsByDirection = data.filter((x) => {
        return x.Direction.toLowerCase() == req.params.direction
      })
    }

    res.send(trainsByDirection)
  })
})

module.exports = router
