var path = require('path')
var express = require('express')
var app = express()
var nunjucks = require('nunjucks')
var markdown = require('nunjucks-markdown')
var marked = require('marked')


var env = nunjucks.configure('paper', {
    autoescape: true,
    express: app,
    noCache: process.env.NODE_ENV == 'development'
})

markdown.register(env, marked)

app.use(express.static(path.resolve(__dirname + '/public')))
app.use(express.static(path.resolve(__dirname + '/dist')))

app.get('/', function(req, res) {
    res.render('index.html');
})

var port = process.env.PORT || 2017
app.listen(port, function () {
  console.log(`listening at ${port} in ${process.env.NODE_ENV} mode`)
})