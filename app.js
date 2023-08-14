const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Liebling, es ist aus.')
})

app.listen(3000, () => {
  console.log('Listening on 3000')
})