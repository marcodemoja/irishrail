var express = require('express')
var router = express.Router()
var request = require('request')
var xmlParser = require('fast-xml-parser')
// currentTime timestamp
const currentTime = new Date().getTime()

/* GET trains listing. */
router.get('/:from/:to', (req, res, next) => {
  let direction

  switch (req.params.from) {
    case 'ARKLW':
      direction = 'northbound'
      break
    case 'SKILL':
      direction = 'southbound'
      break
  }

  request('http://localhost:3001/trains/' + req.params.from + '/' + direction + '/running', (err, data) => {
    let trainDate = new Date()
    let trainsInTime = []
    console.log(data.body, 'data from trains call')
    if (data.body.length > 0) {
      trainsInTime = JSON.parse(data.body).filter((train) => {
        trainDate.setHours(train.Schdepart.split(':')[0])
        trainDate.setMinutes(train.Schdepart.split(':')[1])
        return trainDate.getTime() > currentTime
      })
    }

    res.send(trainsInTime)
  })
})

module.exports = router
