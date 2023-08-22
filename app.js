const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const debug = require('debug')('app')
const app = express()


const db = mongoose.connect('mongodb://msdocs-expressjs-mongodb-che-server:DHIycKP6ytd3I0m8dbeykx4RqZHRsOUcJ2xoPYzxVsvzEYQnyzk6sJQem2mdptimu6d6wEC3ba8RACDbqiyAAg==@msdocs-expressjs-mongodb-che-server.mongo.cosmos.azure.com:10255/msdocs-expressjs-mongodb-che-database?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@msdocs-expressjs-mongodb-che-server@')
//const db = mongoose.connect('mongodb://mongodb/spoc')
/* if (process.env.ENV === 'Test') {
  console.log("This is a test.")
  const db = mongoose.connect('mongodb://127.0.0.1/spoc_test')
} else if ( process.argv[2] === 'int') {
  console.log("This is not a test.")
  const db = mongoose.connect('mongodb://127.0.0.1/spoc')
}  else {  
  console.log("Bin in Docker")
  const db = mongoose.connect('mongodb://mongodb/spoc')
} */

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