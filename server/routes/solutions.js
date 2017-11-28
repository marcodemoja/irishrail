var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')
// currentTime timestamp
const currentTime = new Date().getTime()

/* GET trains listing. */
router.get('/:from/:to', (req, res, next) => {
  // find any useful train to get Bray as this is a mandatory stop from both directions
  request('http://localhost:3001/trains/get-currents', (err, response, body) => {
    let data = JSON.parse(body)
    let trip1 = [] // list of trains from starting point to Bray
    let trip2 = [] // list of trains from Bray to ending point

    if (Array.isArray(data)) {
      switch (req.params.from) {
        case 'ARKLW':
          // get the trainCode of any intercity from Rosslare Europort with direction Northbound
          trip1 = data.filter((x) => x.PublicMessage.indexOf('Rosslare Europort') !== -1 && x.Direction == 'Northbound')
          console.log(data, 'currentTrains')
          console.log(trip1, 'first train if you start from Arklow')
          /* request('http://localhost:3001/station//get-trains', (err, response, body) => {

          }) */
          // check if any
          break
        case 'SKILL':
          // any train that stops to Bray
          break
      }
    }

    res.send(xmlParser.parse(body))
  })
/* request('http://localhost:3001/trains/' + req.params.from + '/' + direction + '/running', (err, response, body) => {
  let trainDate = new Date()
  let trainsInTime = []
  console.log(body, 'data from trains call')
  if (body.length > 0) {
    trainsInTime = JSON.parse(body).filter((train) => {
      trainDate.setHours(train.Schdepart.split(':')[0])
      trainDate.setMinutes(train.Schdepart.split(':')[1])
      return trainDate.getTime() > currentTime
    })
  }

  res.send(trainsInTime)
}) */
})

module.exports = router
