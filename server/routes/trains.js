var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:station_code/:direction/running', function(req, res, next) {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + req.params.station_code, (err, data) => {
    let json = xmlParser.parse(data.body)
    let trainsByDirection
    json = json.ArrayOfObjStationData

    trainsByDirection = json.filter((x) => {
      return x.Direction == req.params.direction.toUpperCase()
    })

    console.log(trainsByDirection, 'trainsByDirection')
    res.send(trainsByDirection)
  })
})

module.exports = router
