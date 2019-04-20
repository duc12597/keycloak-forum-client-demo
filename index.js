var express = require('express'),
    session = require('express-session'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan')
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.render('index')
})

var port = 3000
app.listen(port, () => {
  console.log('http://localhost:' + port)
})