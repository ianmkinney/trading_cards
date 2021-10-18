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
    const userID = req.params.id;
    const cardID = req.params.cardid;
    const user = await Collector.findByPk(userID);
    const selectedCard = await Card.findByPk(cardID);
    if(user.budget > selectedCard.price && selectedCard.CollectorId == null) {
        user.budget = user.budget - selectedCard.price
        await user.addCard(selectedCard)
        await user.save()
        await selectedCard.save()
        res.send(`<h1>${selectedCard.name} ${selectedCard.rarity} was purchased by ${user.name} for $${selectedCard.price}!</h1>
                  <h2>${user.name}'s budget is at $${user.budget}</h2>`)
    } else if(selectedCard.CollectorId != null){
        conflictUser = await Collector.findByPk(selectedCard.CollectorId)
        res.send(`<h1>Card belongs to ${conflictUser.name}<h1>`)
    } else {
        res.send(`<h1>Card is too expensive<h1>`)
    }
})

//selling a card
app.get('/:id/pack/:cardid/sell', async (req,res) => {
    let userID = req.params.id;
    let cardID = req.params.cardid;
    let user = await Collector.findByPk(userID);
    let selectedCard = await Card.findByPk(cardID);
    if(selectedCard.CollectorId == userID) {
        user.budget = user.budget + selectedCard.price;
        await user.save();
        await user.removeCard(selectedCard);
        res.send(`<h1>${selectedCard.name} ${selectedCard.rarity} was sold by ${user.name} for $${selectedCard.price}!</h1>
                  <h2>${user.name}'s budget is at $${user.budget}</h2>`)
    } else if(selectedCard.CollectorId == null) {
        res.send('<h1>Card has not be purchased by a collector, so it can not be sold.')
    } else {
        conflictUser = await Collector.findByPk(selectedCard.CollectorId)
        res.send(`<h1>Card can not be sold, car belongs to ${conflictUser.name}`)
    }
})

app.get('/:cardid1/:cardid2/trade', async (req,res) => {
    let card1ID = req.params.cardid1;
    let card2ID = req.params.cardid2;
    let card1 = await Card.findByPk(card1ID)
    let card2 = await Card.findByPk(card2ID)
    let user1 = await Collector.findByPk(card1.CollectorId)
    let user2 = await Collector.findByPk(card2.CollectorId)
    if(card1.CollectorId == null) {
        res.send(`<h1>Can not trade ${card1.name} ${card1.rarity} because it has not been purchased.</h1>`)
    } else if(card2.CollectorId == null) {
        res.send(`<h1>Can not trade ${card2.name} ${card1.rarity} because it has not been purchased.</h1>`)
    } else if(card1.CollectorId == card2.CollectorId) {
        res.send(`<h1>Owner owns both cards! can not trade</h1>`)
    } else {
        await user2.removeCard(card2)
        await user1.removeCard(card1)
        await user2.addCard(card1)
        await user1.addCard(card2)
        await user1.save()
        await user2.save()
        res.send(`<h1>${user1.name} traded ${card1.name} ${card1.rarity} with ${user2.name} for ${card2.name} ${card2.rarity}!</h1>`)
    }
})

app.listen( PORT, () => {
    console.log(` Your server is now listening to port ${PORT}`)
})