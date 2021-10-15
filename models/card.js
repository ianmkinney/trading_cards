const {db,DataTypes,Model} = require(`../db`)

class Card extends Model {

}

Card.init({

    name: DataTypes.STRING,
    imgurl: DataTypes.STRING,
    cost: DataTypes.DOUBLE
}, {
    sequelize: db
}
)

module.exports = {
    Card
}