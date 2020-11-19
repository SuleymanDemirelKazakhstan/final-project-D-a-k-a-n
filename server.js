const express = require('express');
const exphbs  = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
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
			res.render('index', {cars:result});//common
		});
	});

	app.get('/admin', (req, res)=>{
		//dbo.collection(collection_servers).find().toArray((err,result)=>{
			//if(err) throw err;
			res.render('admin');//common
		//});
	});

	app.get('/news_list', (req,res)=>{
		dbo.collection(collection_news).find().toArray((err,result)=>{
			if(err) throw err;
			res.render('news_list', {'news': result});//common
		});
	});

	app.post('/news_list', (req,res)=>{
		//news info
		let head = req.body.header;
		let main_text = req.body.main;
		let image = req.body.img;
		//data info
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth()+1;//+1 becouse 0='January'
		let year = date.getFullYear();

		console.log(head + "  " + main_text + "  " + day + "  " + month + "  " + year);
		let query = {'header': head, 'main': main_text, 'image': image, 'day': day, 'month': month, 'year': year};
		dbo.collection(collection_news).insertOne(query,(err,result)=>{
			if(err) throw err;
		});
		res.send(`<a href='/news_list'>View news</a><br><a href='/admin'>Back</a>`);
	});

	// app.post('/cars', (req, res)=>{
	// 	let query = { brand: req.body.brand };
	// 	dbo.collection("cars").find(query).toArray((err,result)=>{
	// 		if(err) throw err;
	// 		res.send(result);
	// 	});
	// });

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