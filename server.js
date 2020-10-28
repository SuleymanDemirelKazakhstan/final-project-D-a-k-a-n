var express = require('express')
var app = express()
app.set('view engine', 'ejs')

app.use(express.static(__dirname))

console.log(__dirname)

app.get('/', function(req, res){
	res.render('index')
})

app.listen(3000)