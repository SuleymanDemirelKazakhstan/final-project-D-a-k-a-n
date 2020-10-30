var express = require('express')
var app = express()
app.set('view engine', 'ejs')

app.use(express.static(__dirname))


app.get('/', function(req, res){
	res.render('index', )
	app.listen(3000);
})

console.log("Server has started")
app.listen(3000)