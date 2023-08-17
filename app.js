const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app')
const app = express()
//const db = mongoose.connect('mongodb://mongodb/spoc')
if (process.env.ENV === 'Test') {
  console.log("This is a test.")
  const db = mongoose.connect('mongodb://127.0.0.1/spoc_test')
} else if ( process.argv[2] === 'int') {
  console.log("This is not a test.")
  const db = mongoose.connect('mongodb://127.0.0.1/spoc')
}  else {  
  console.log("Bin in Docker")
  const db = mongoose.connect('mongodb://mongodb/spoc')
}

const path = require('path')
const port = process.env.PORT || 3000

const Material = require('./models/material')
const materialRouter = require('./routes/materialRouter')(Material)

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/frontend/dist/frontend')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use('/api', materialRouter)

app.get('/', (req, res) => {
  res.send('Liebling, es ist aus.')
})

app.server = app.listen(port, () => {
  debug(`Listening on ${port}`)
})

module.exports = app