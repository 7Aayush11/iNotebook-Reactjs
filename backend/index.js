const connectToMongo = require('./db')
var cors = require('cors')

connectToMongo()
const express = require('express')
const app = express()
const port = 4000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World! 33333')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}/`)
})