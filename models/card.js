const {db,DataTypes,Models} = require(`../db`)

class Card extends Models {

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
