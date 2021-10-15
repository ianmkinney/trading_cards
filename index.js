const { db, DataTypes, Model } = require('./db') 

const { Card } = require('./card')
const { Collector } = require('./Collector')

Card.belongsTo(Collector)
Collector.hasMany(Card)

module.exports = { Card, Collector }