const express = require('express')
const app = express()
const PORT = 3000

const seed = require('./seed')
const { db } = require('./db')
const { Card } = require('./models/index')
const { Collector } = require('./models/index')

//start the server
seed()

//*************** ROUTES ******************//
app.get('/allCards', async (req, res) => {
    let allCards = await Card.findAll()  // SELECT * FROM MUSIC
    res.json({allCards})
})

app.listen( PORT, () => {
    console.log(` Your server is now listening to port ${PORT}`)
})