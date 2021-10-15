const path = require('path')
const fs = require('fs').promises

const {db} = require('./db')
const { Card } = require('./models/index')
const { Collector } = require('./models/index')

const seed = async () => {
    await db.sync({ force: true });

    const seedPath = path.join(__dirname, 'pokemon_cards.json');
    const buffer = await fs.readFile(seedPath);

    const {data} = JSON.parse(String(buffer));

    const cardPromises = data.map(card => Card.create(card));
    const collectorPromises = data.map(collector => Collector.create(collector));

    await Promise.all(cardPromises);
    await Promise.all(collectorPromises);
    console.log('Card and collector database info populated')
}

module.exports = seed;