const path = require('path')
const fs = require('fs').promises

const {db} = require('./db')
const { Card } = require('./index')

const seed = async () => {
    await db.sync({ force: true });

    const seedPath = path.join(__dirname, 'pokemon_cards.json');
    const buffer = await fs.readFile(seedPath);

    const {data} = JSON.parse(String(buffer));

    const cardPromises = data.map(cards => Card.create(cards));

    await Promise.all(cardPromises);
    console.log('Card database info populated')
}

module.exports = seed;