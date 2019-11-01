module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('server started ---哟哟哟')
  })

  app.get('/test', function (req, res) {
    let data = require('../api/modules/test/test.js')
    res.send(data)
  })

  app.post('/login', function (req, res) {
    let data = require('../api/modules/user/login.js')
    res.send(data)
  })
}
