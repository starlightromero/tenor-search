// Require Libraries
const express = require('express')
const exphbs = require('express-handlebars')
const Tenor = require('tenorjs').client({
  'Key': 'IS6NH5YK3WV5', // https://tenor.com/developer/keyregistration
  'Filter': 'high', // "off", "low", "medium", "high", not case sensitive
  'Locale': 'en_US' // Your locale here, case-sensitivity depends on input
})

// App Setup
const app = express()
app.use(express.static('public'))

// Middleware

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Routes
app.get('/greetings/:name', (req, res) => {
  // grab the name from the path provided
  const name = req.params.name
  // render the greetings view, passing along the name
  res.render('greetings', { name })
})

app.get('/:username', (req, res) => {
  res.send('Hello Squirrel')
})

app.get('/', (req, res) => {
  // Handle the home page when we haven't queried yet
  term = ''
  if (req.query.term) {
    term = req.query.term
  }
  // Tenor.search.Query("SEARCH KEYWORD HERE", "LIMIT HERE")
  Tenor.Search.Query(term, '10').then(response => {
    // store the gifs we get back from the search
    const gifs = response
    // pass the gifs as an object into the home page
    res.render('home', { gifs })
  }).catch(console.error)
})

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!')
})
