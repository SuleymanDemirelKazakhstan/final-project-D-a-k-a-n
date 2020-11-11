const express = require('express');
const exphbs  = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var collection_servers = "servers";
var collection_comments = "comments";
var collection_news = "news";
var collection_items = "items";

MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("web_project");

	app.get('/', (req, res)=>{
		dbo.collection(collection_servers).find().toArray((err,result)=>{
			if(err) throw err;
			res.render('index', {cars:result});
		});
	});

	app.get('/admin', (req, res)=>{
		dbo.collection(collection_servers).find().toArray((err,result)=>{
			if(err) throw err;
			res.render('admin', {cars:result});
		});
	});

	app.post('/cars', (req, res)=>{
		let query = { brand: req.body.brand };
		dbo.collection("cars").find(query).toArray((err,result)=>{
			if(err) throw err;
			res.send(result);
		});
	});

	app.get('/del', (req, res)=>{
		dbo.collection("cars").drop(function(err, delOK) {
	    	if (err) throw err;
	    	if (delOK) console.log("Collection deleted");
	  	});
	  	res.send("Elements was deleted");
	});

	app.get('/add', (req, res)=>{
	  	for(let i = 0; i < cars.length; i++){
		  	dbo.collection("cars").insertOne(cars[i], function(err, res) {
		    	if (err) throw err;
		    	console.log("1 document inserted");
		  	});
		}

		res.send("Elements was added");
	});


	app.listen(3000, function(){
		console.log("Server has started");
	});
});