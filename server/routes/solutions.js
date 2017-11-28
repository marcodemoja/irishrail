var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')

/* GET trains listing. */
router.get('/:from/:to', (req, res, next) => {
  let direction = ''

  switch (req.params.from) {
    case 'ARKLW':
      direction = 'Northbound'
      break
    case 'SKILL':
      direction = 'Southbound'
      break
  }

  request('http://localhost:3001/trains/' + req.params.from + '/' + direction + '/running', (err, response, body) => {
    let trainDate = new Date()
    let trainsInTime = []
    // currentTime timestamp
    let currentTime = new Date().getTime()
    console.log(body, 'data from trains call')

    if (body.length > 0) {
      trainsInTime = JSON.parse(body).filter((train) => {
        trainDate.setHours(train.Schdepart.split(':')[0])
        trainDate.setMinutes(train.Schdepart.split(':')[1])
        console.log(trainDate, 'trainDate')
        console.log(currentTime, 'currentTime')
        return trainDate.getTime() > currentTime
      })
    }

    res.send(trainsInTime)

  // find any useful train to get Bray as this is a mandatory stop from both directions
  // A607 A605 A603 are trainCode intercity that pass from arklow and stop to bray
  /* request('http://localhost:3001/trains/get-currents', (err, response, body) => {
    let data = JSON.parse(body)
    let trip1 = []
    let trip2 = []

    if (Array.isArray(data)) {
      switch (req.params.from) {
        case 'ARKLW':
          // get the trainCode of any intercity from Rosslare Europort with direction Northbound
          trip1 = data.filter((x) => x.PublicMessage.indexOf('Rosslare Europort') !== -1 && x.Direction == 'Northbound')
          console.log(data, 'currentTrains')
          console.log(trip1, 'first train if you start from Arklow')
          break
        case 'SKILL':
          // any train that stops to Bray
          break
      }
    }
    res.send(xmlParser.parse(body)) */
  })
})

module.exports = router
