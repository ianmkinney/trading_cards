const {db,DataTypes,Models} = require('../db')

class Collector extends Models {

}

Collector.init({
    name: DataTypes.STRING,
    budget: DataTypes.DEC
}, {
    sequelize: db
}
)

module.exports = {
    Collector
}