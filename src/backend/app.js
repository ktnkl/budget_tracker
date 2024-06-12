const express = require('express')
const app = express()
const port = 3000

const obj = {
  name: 'alexey',
  position: 'student',
}

const objToJSON = JSON.stringify(obj)

app.get('/', function(req, res) {
  res.sendFile('..\frontend\index.html')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})