let express = require('express')
let Sequelize = require('sequelize')
let bodyParser = require('body-parser')
let sequelize = new Sequelize('herokuapp', 'root', 'hiepvv', {
  dialect: 'mysql',
  logging: false
})
let app = express()

app.set('port', process.env.PORT || 3000)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
sequelize.authenticate().then(function () {
  console.log('Connect to Database successfully!')
}).catch(function (err) {
  console.log('Connect to Database fail!', err)
})

let Book = sequelize.define('Book', {
  title: Sequelize.STRING,
  categories: Sequelize.STRING,
  content: Sequelize.STRING
})

let parseJSON = function (dataJSON) {
  let data = {
    'id': dataJSON.id,
    'title': dataJSON.title,
    'categories': dataJSON.categories,
    'content': dataJSON.content
  }
  return data
}

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api', function (req, res) {
  res.send('Basic API!')
})

app.get('/api/posts', function (req, res) {
  Book.sync().then(function () {
    Book.findAll({limit: 40, attributes: ['id', 'title', 'categories']}).then(function (data) {
      if (data) {
        res.send(JSON.stringify(data))
      } else {
        res.send('data is empty!')
      }
    })
  })
})

app.post('/api/posts', function (req, res) {
  Book.sync().then(function () {
    let book = {
      'title': req.body.title,
      'categories': req.body.categories,
      'content': req.body.content
    }
    Book.create(book).then(function (data) {
      if (data) {
        res.send(JSON.stringify(parseJSON(data)))
      } else {
        res.send('data is empty!')
      }
    })
  })
})

app.get('/api/posts/:id', function (req, res) {
  Book.sync().then(function () {
    Book.find({where: {id: req.params.id}, attributes: ['id', 'title', 'categories', 'content']}).then(function (data) {
      if (data) {
        res.send(JSON.stringify(data))
      } else {
        res.send('data is empty!')
      }
    })
  })
})

app.delete('/api/posts/:id', function (req, res) {
  Book.sync().then(function () {
    Book.find({where: {id: req.params.id}, attributes: ['id', 'title', 'categories', 'content']}).then(function (data) {
      if (data) {
        res.send(JSON.stringify(data))
      } else {
        res.send('data is empty!')
      }
    })
    Book.destroy({where: {id: req.params.id}}).then(function (data) {
    })
  })
})

app.put('/api/posts/:id', function (req, res) {
  Book.sync().then(function () {
    Book.find({where: {id: req.params.id}}).then(function (data) {
      if (data) {
        data.updateAttributes({
          title: req.body.title,
          categories: req.body.categories,
          content: req.body.content
        }).then(function () {})
        res.send(JSON.stringify(parseJSON(data)))
      } else {
        res.send('id is not exitst')
      }
    })
  })
})

module.exports = app
