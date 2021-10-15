const path = require('path')
const fs = require('fs').promises

const {db} = require('./db')
const { Card } = require('./models/index')
const { Collector } = require('./models/index')

function popTable(db, table, json) {

    const seed = async () => {

        await db.sync({ force: true });

        const seedPath = path.join(__dirname, json);

        const buffer = await fs.readFile(seedPath);
        const {data} = JSON.parse(String(buffer));

        const musicPromises = data.map(stuff => table.create(stuff));

        await Promise.all(musicPromises);

        console.log(`db populated with ${json}`);
    }

    seed()
}

const seed = async () => {

    popTable(db, Card, 'pokemon_cards.json')

    popTable(db, Collector, 'collectors.json')

}

module.exports = seed;