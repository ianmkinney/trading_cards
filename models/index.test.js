const { db } = require('./db')

//import our models from the file where we've created the associations
const { Card, Collector } = require('./index')


//write our test suite
describe('Card collection database', () => {

    //clear out our database
    //beforeAll() <- a jest method that will run something before we invoke any tests
    //we dont know how long its going to take to 
    beforeAll(async () => {
        await db.sync({
            force: true //clears out all entries in all of our tables in our db
        })
    })

    //make sure that we can create entries in our tables (rows)
    test('can create a card', async () => {
        //create a row in the Game table
        //.create
        const testCard = await Card.create({"name":"Alakazam","level":42.0,"price":158,"rarity":"Rare Holo","image":"https:\/\/images.pokemontcg.io\/base1\/1.png"})
        expect(testCard.name).toBe('Alakazam')
        expect(testCard.level).toBe(42.0)
        expect(testCard.price).toBe(158)
        expect(testCard.rarity).toBe('Rare Holo')
        expect(testCard.image).toBe('https:\/\/images.pokemontcg.io\/base1\/1.png')
    })

    test('Collector can have many cards', async () => {
        // create a user instance from the User model
        const newCollector = await Collector.create({ name: 'test', budget: 300})

        // three game instances from the Game model
        const card1 = await Card.findByPk(1)
        const card2 = await Card.findByPk(2)
        const card3 = await Card.findByPk(3)

        //magic methods where we can associate data from one table to another
        //.add__nameOfTable___ 
        await newCollector.addCard(card1)
        await newCollector.addCard(card2)
        await newCollector.addCard(card3)

        //magic method to retrieve all the games from the user
        //.get__nameOfTable__(s) <-pluralize the name of the table
        //CALL THE instance of the USER NOT ON THE TABLE
        const cards = await newCollector.getCards()

        expect(cards.length).toBe(3)

        newCollector.destroy();
    })

})