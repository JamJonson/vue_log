
var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
require('./routers')(app)

app.listen(3000, function () {
  console.log('app listening at http://localhost:3000')
})
