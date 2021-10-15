const {db,DataTypes,Model} = require('../db')

class Collector extends Model {

}

Collector.init({
    name: DataTypes.STRING,
    budget: DataTypes.DOUBLE
}, {
    sequelize: db
}
)

module.exports = {
    Collector
}
