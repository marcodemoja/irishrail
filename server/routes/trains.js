var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:station_code/:direction/running', function(req, res, next) {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + req.params.station_code, (err, data) => {
    let json = xmlParser.parse(data.body)
    let trainsByDirection
    json = json.ArrayOfObjStationData.objStationData

    trainsByDirection = json.filter((x) => {
      console.log(req.params.direction.toUpperCase(), 'direction')
      console.log(x.Direction, 'x.Direction')
      return x.Direction.toLowerCase() == req.params.direction
    })

    console.log(trainsByDirection, 'trainsByDirection')
    res.send(trainsByDirection)
  })
})

module.exports = router
