const { db, DataTypes, Model } = require('./db') 

const { Card } = require('./models/card')
const { Collector } = require('./models/Collector')

Card.belongsTo(Collector)
Collector.hasMany(Card)

module.exports = { Card, Collector }