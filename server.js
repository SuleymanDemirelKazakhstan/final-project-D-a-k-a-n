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

//collections name
var collection_comments = "comments";
var collection_news = "news";
var collection_items = "items";

//id count news
var countNews = 1;

//
MongoClient.connect(url, function(err, db) {
  	if (err) throw err;
  	var dbo = db.db("web_project");

	app.get('/', (req, res)=>{
		dbo.collection(collection_news).find().toArray((err,result)=>{
			if(err) throw err;
			res.render('index', {news:result});//common
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
		let image = 'pictures/' + req.body.img;
		console.log(image);
		//data info
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth()+1;//+1 becouse 0='January'
		let year = date.getFullYear();

		console.log(countNews + " " + head + "  " + main_text + "  " + day + "  " + month + "  " + year);
		let query = {'id': countNews++, 'header': head, 'main': main_text, 'image': image, 'day': day, 'month': month, 'year': year};
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

	app.get('/news_list/:type-:id', (req, res)=>{
		let id = req.params.id;
		let type = req.params.type;
		console.log("DONE! " + type + " " + id);
		let query = {'id': parseInt(id)};
		dbo.collection(collection_news).deleteOne(query, function(err, delOK) {
	    	if (err) throw err;
	    	if (delOK) console.log("1document deleted " + id);
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