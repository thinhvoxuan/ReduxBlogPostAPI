var express   = require('express')
var Sequelize = require('sequelize')
var bodyParser = require("body-parser");

var sequelize = new Sequelize('herokuapp', 'root', 'hiepvv', {
	dialect: 'mysql',
	logging: false
})

sequelize.authenticate().then(function(err) {
	console.log('Connect to Database successfully!')
}).catch(function(err) {
	console.log('Connect to Database fail!', err)
})

var Book = sequelize.define('Book', {
	title: Sequelize.STRING,
	categories: Sequelize.STRING,
	content: Sequelize.STRING
})

var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var parseJSON = function(dataJSON) {
	var data = {
		'id' : dataJSON.id,
		'title' : dataJSON.title,
		'categories' : dataJSON.categories,
		'content' : dataJSON.content
	}
	return data
}

app.get('/', function(req, res) {
	res.send('Basic API')
})

app.get('/api/posts', function(req, res) {
	Book.sync().then(function() {
		Book.findAll({limit: 40, attributes: ['id', 'title', 'categories']}).then(function(data) {
			res.send(JSON.stringify(data))
		})
	})
})

app.post('/api/posts', function(req, res) {
	Book.sync().then(function() {
		var book = {
			'title' : req.body.title,
			'categories' : req.body.categories,
			'content' : req.body.content
		}
		Book.create(book).then(function(data) {
			res.send(JSON.stringify(parseJSON(data)))
		})
	}) 
})

app.get('/api/posts/:id', function(req, res) {
	Book.sync().then(function() {
		Book.find({where: {id: req.params.id}, attributes: ['id', 'title', 'categories', 'content']}).then(function(data) {
			res.send(JSON.stringify(data))
		})
	})
})

app.delete('/api/posts/:id', function(req, res) {
	Book.sync().then(function() {
		Book.find({where: {id: req.params.id}, attributes: ['id', 'title', 'categories', 'content']}).then(function(data) {
			res.send(JSON.stringify(data))
		})
		Book.destroy({where: {id: req.params.id}}).then(function(data) {
		})
	})
})

var server = app.listen(3000, function() {
	var host = server.address().address
	var port = server.address().port

	console.log('server listening at http://%s:%s', host, port)
})
