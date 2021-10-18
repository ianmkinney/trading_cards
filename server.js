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
    let allCards = await Card.findAll()
    res.json({allCards})
})

app.get('/allCollectors', async (req,res) => {
    let allCollectors = await Collector.findAll()
    res.json({allCollectors})
})

app.get('/:id/pack', async (req,res) => {
    let ids = []
    let cards = []
    for(let i = 0; i < 10; i++) {
        let id = Math.floor(Math.random() * 102) + 1
        while(ids.includes(id)) {
            id = Math.floor(Math.random() * 102) + 1
        }
        ids.push(id)
        let oneCard = await Card.findByPk(id)
        cards.push(oneCard)
    }
    res.json({cards})
})

app.get('/:id/pack/:cardid/buy', async (req,res) => {
    let userID = req.params.id;
    let cardID = req.params.cardid;
    let user = await Collector.findByPk(userID);
    let selectedCard = await Card.findByPk(cardID);
    selectedCard.belongsTo(user);
    user.budget = user.budget - selectedCard.price
    res.json(user)
})

app.get('/:id/pack/:cardid/sell', async (req,res) => {

})

app.get('/:id/pack/:cardid/trade', async (req,res) => {

})

app.listen( PORT, () => {
    console.log(` Your server is now listening to port ${PORT}`)
})