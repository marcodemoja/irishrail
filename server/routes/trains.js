var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:station_code/:direction/running', function(req, res, next) {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML?StationCode=' + req.params.station_code, (err, response, body) => {
    if (err) res.send(err)

    let json = xmlParser.parse(body)
    let trainsByDirection = []
    console.log(body, 'body of running trains call')
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

router.get('/get-train-movements/:trainCode', (req, res, next) => {
  let paramDate = decodeURI(req.params.runningDate).split('-')
  let runningDate = new Date()

  request('http://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML?TrainId=' + req.params.trainCode + '&TrainDate=' + runningDate.getFullYear() + '-' + (runningDate.getMonth() + 1) + '-' + runningDate.getUTCDate(), (err, response, data) => {
    if (err) res.send(err)
    res.send(xmlParser.parse(data))
  })
})

router.get('/get-currents', (req, res, next) => {
  request('http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML', (err, response, body) => {
    if (response.statusCode == 200) {
      let json = xmlParser.parse(body)
      // remove TERMINATED trains
      let data = json.ArrayOfObjTrainPositions.objTrainPositions.filter((x) => x.PublicMessage.indexOf('TERMINATED') == -1)
      res.send(data)
    } else {
      res.send('api not working')
    }
  })
})

module.exports = router
