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

//sessions and cookie
const cookieParser = require('cookie-parser');
let session = require('express-session');
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

//collections name
var collection_comments = "comments";
var collection_news = "news";
var collection_items = "items";

//id count news
var countNews = 1;
//id count items
var countItems = 1;

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

	app.get('/news-:id', (req,res)=>{
		let id = parseInt(req.params.id);
		let query = { 'id': id };
		dbo.collection(collection_news).findOne(query, (err,result)=>{
			if(err) throw err;

			res.render('news_elements', { 'new': result });
		});
	});

	app.get('/market', (req,res)=>{
		res.render('market');
	});

	app.get('/market/all_items', (req,res)=>{
		dbo.collection(collection_items).find().toArray((err,result)=>{
			if(err) throw err;
			res.render('market_gallery');
		});
	});

	app.get('/market/item-:id', (req, res)=>{
		let id = parseInt(req.params.id);
		let query = { 'id': id };
		dbo.collection(collection_items).findOne(query, (err, result)=>{
			if(err) throw err;

			res.render('market_element', { 'item': result });
		});
	});

	app.post('/market/load-items', (req,res)=>{
		dbo.collection(collection_items).find().toArray((err,result)=>{
			if (err) throw err;
			res.send(result);
		});
		// res.cookie("CookieStar", '123');
	});

	app.post('/market/find-item', (req,res)=>{
		let name = req.body.name;
		console.log(name);
		let query = { 'name': name };
		if(name == ''){
			query = {};
		}
		dbo.collection(collection_items).find(query).toArray((err,result)=>{
			if (err) throw err;
			res.send(result);
		});
	});

	app.post('/market/setStar', (req,res)=>{
		let starItem = req.body.id;
		let cookie = req.cookies.CookieStar;
		if(cookie == undefined){
			cookie = starItem;
		}
		else{
			let setCookie = new Set(cookie);

			if(!setCookie.has(starItem.toString())){
				cookie += starItem;
			}
			// setCookie.add(starItem);
		}
		res.cookie("CookieStar", cookie);
		
		res.send({});
	});
	app.post('/market/removeStar', (req,res)=>{
		let starItem = req.body.id;
		let cookie = req.cookies.CookieStar;
		let setCookie = new Set(cookie);
		cookie = "";

		setCookie.delete(starItem.toString());
		setCookie.forEach(writeCookie);

		function writeCookie(values){
			cookie += values;
		}

		res.cookie("CookieStar", cookie);
		console.log(cookie+"hi");
		res.send({});
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
		let image = '/pictures/news/' + req.body.img;
		console.log(image);
		//data info
		let date = new Date();
		let day = date.getDate();
		let month = date.getMonth()+1;//+1 becouse 0='January'
		let year = date.getFullYear();

		dbo.collection(collection_news).find().toArray((err,result)=>{
			if(err) throw err;
			countNews = result.length + 1;


			console.log(countNews + " " + head + "  " + main_text + "  " + day + "  " + month + "  " + year);
			let query = {'id': countNews, 'header': head, 'main': main_text, 'image': image, 'day': day, 'month': month, 'year': year};
			dbo.collection(collection_news).insertOne(query,(err,result)=>{
				if(err) throw err;
			});
			res.send(`<a href='/news_list'>View news</a><br><a href='/admin'>Back</a>`);
		});
	});

	app.get('/news_list/:type-:id', (req, res)=>{
		let id = req.params.id;
		let type = req.params.type;
		console.log("DONE! " + type + " " + id);
		let query = {'id': parseInt(id)};
		dbo.collection(collection_news).deleteOne(query, function(err, delOK) {
	    	if (err) throw err;
	    	if (delOK) console.log("1document deleted " + id);
	  	});
	  	res.send(`Elements was deleted<br><a href="/news_list">back</a>`);
	});

	app.post('/news_list/update:id', (req,res)=>{
		let id = parseInt(req.params.id);
		let head = req.body.header;
		let main_text = req.body.main;
		let image = '/pictures/news/' + req.body.img;

		let old_query = { 'id': id };
		dbo.collection(collection_news).findOne(old_query, (err,result)=>{
			if(err) throw err;

			if(head == ''){
				head = result.header;
			}
			if(main_text == ''){
				main_text = result.main;
			}
			if(image == '/pictures/news/'){
				image = result.image;
			}
			
			let new_query = { $set:{ 'header': head, 'main': main_text, 'image': image }};

			dbo.collection(collection_news).updateOne(old_query, new_query, function(err, resa) {
				if (err) throw err;
				console.log("1 document updated");

				res.send(`1 document updated<br><a href="/news_list">back</a>`);
			});
		});
	});

	app.get('/item_list', (req,res)=>{
		dbo.collection(collection_items).find().toArray((err,result)=>{
			if(err) throw err;
			res.render('item_list', {'item': result});//common
		});
	});

	app.post('/item_list', (req,res)=>{
		//item info
		let item_name = req.body.name;
		let description = req.body.description;
		let price = parseInt(req.body.price);
		let image = '/pictures/item/' + req.body.img;

		dbo.collection(collection_items).find().toArray((err, result)=>{

			countItems = result.length + 1;

			let query = {'id': countItems, 'name': item_name, 'description': description, 'price': price, 'img': image};
			dbo.collection(collection_items).insertOne(query,(err,result)=>{
				if(err) throw err;
			});
			res.send(`<a href='/item_list'>View items</a><br><a href='/admin'>Back</a>`);
		});
	});

	app.get('/item_list/:type-:id', (req, res)=>{
		let id = parseInt(req.params.id);
		let type = req.params.type;
		console.log("DONE! " + type + " " + id);
		let query = {'id': id};
		dbo.collection(collection_items).deleteOne(query, function(err, delOK) {
	    	if (err) throw err;
	    	if (delOK) console.log("1document deleted " + id);
	  	});
	  	res.send(`Elements was deleted<br><a href="/item_list">back</a>`);
	});

	app.post('/item_list/update:id', (req,res)=>{
		let id = parseInt(req.params.id);
		let name = req.body.name;
		let description = req.body.description;
		let price = req.body.price;
		let image = '/pictures/item/' + req.body.img;

		let old_query = { 'id': id };
		dbo.collection(collection_items).findOne(old_query, (err,result)=>{
			if(err) throw err;

			if(name == ''){
				name = result.name;
			}
			if(description == ''){
				description = result.description;
			}
			if(price == ''){
				price = result.price;
			}
			if(image == '/pictures/item/'){
				image = result.img;
			}
			
			price = parseInt(price);
			let new_query = { $set:{ 'name': name, 'description': description, 'price': price, 'img': image }};

			dbo.collection(collection_items).updateOne(old_query, new_query, function(err, resa) {
				if (err) throw err;
				console.log("1 document updated");

				res.send(`1 document updated<br><a href="/item_list">back</a>`);
			});
		});
	});

	app.listen(3000, function(){
		console.log("Server has started");
	});
});