const express = require('express')
const request = require('request')

const target = 'sydsvenskan.se'

const app = express()

const allowCrossDomain = function(req, res, next) {
  console.log('allowingCrossDomain')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization, X-Mindflash-SessionID'
  )

  if ('OPTIONS' == req.method) {
    res.send(200)
  } else {
    next()
  }
}

app.use(allowCrossDomain)

app.all('/*', function(req, res) {
  req.pipe(request(target + req.url)).pipe(res)
})

app.listen(9898)

console.log('Proxy running on port 9898')
