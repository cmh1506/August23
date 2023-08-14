const express = require('express')
const morgan = require('morgan')
const debug = require('debug')('app')
const app = express()
const path = require('path')

app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, '/public/')))

app.get('/', (req, res) => {
  res.send('Liebling, es ist aus.')
})

app.listen(3000, () => {
  debug('Listening on 3000')
})