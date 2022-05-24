const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = mongoose.connection
const URL = require('./models/URL')
const shortenUrl = require('./shorten')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))


db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  // const newURL = shortenUrl()
  // console.log('new URL=', newURL)
  res.render('index')
})

app.post('/', (req, res) => {
  const longURL = req.body.url
  const shortURL = shortenUrl()

  URL.findOne({ longURL })
    .then(data => {
      if (!data) {
        URL.create({ longURL, shortURL })
      }
    })
    .then(res.render('index', { shortURL }))
    .catch(error => console.error(error))

})

app.get('/:shortURL', (req, res) => {
  const { shortURL } = req.params
  URL.findOne({ shortURL })
    .then(data => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't find this URL！",
          errorURL: 'http://localhost:3000/' + shortURL,
        })
      }
      res.redirect(data.longURL)
    })
    .catch(error => console.error(error))
})

app.listen(port, (req, res) => {
  console.log(`express is on http://localhost:${port}`)
})
