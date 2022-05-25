const express = require('express')
const router = express.Router()

const URL = require('../../models/URL')
const shortenUrl = require('../../utils/shorten')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
  const longURL = req.body.url
  const shortURL = shortenUrl()
  if (!longURL) return res.redirect("/")

  URL.findOne({ longURL })
    .lean()
    .then(data => {
      if (!data) {
        URL.create({ longURL, shortURL })
        res.render('index', { shortURL })
      } else if (data) {
        res.render('index', { shortURL: data.shortURL })
      }
    })
    .catch(error => console.error(error))
})

// app.post("/", (req, res) => {
// if (!req.body.url) return res.redirect("/")
//   const shortURL = shortenUrl()

//   URL.findOne({ longURL: req.body.url })
//     .then(data =>
//       data ? data : URL.create({ shortURL, longURL: req.body.url })
//     )
//     .then(data =>
//       res.render("index", {
//         shortURL: data.shortURL,
//       })
//     )
//     .catch(error => console.error(error))
// })

router.get('/:shortURL', (req, res) => {
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

module.exports = router