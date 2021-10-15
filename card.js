const {db,DataTypes,Model} = require(`./db`)

class Card extends Model {

}

Card.init({
    name: DataTypes.STRING,
    level: DataTypes.DOUBLE,
    price: DataTypes.DOUBLE,
    rarity: DataTypes.STRING,
    number: DataTypes.INTEGER,
    image: DataTypes.STRING
}, {
    sequelize: db
}
)

module.exports = {
    Card
}