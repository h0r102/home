const express = require('express')
const app = express()
const { API_PORT } = require('./const')
const Shopping = require('./route/shoppingRoute')

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(Shopping)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('謎')
})

console.log(`Listen: http://127.0.0.1:${API_PORT}`)
app.listen(API_PORT)