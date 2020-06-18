const {Sequelize} = require('sequelize')

const database = new Sequelize(
    'cast_data', // database
    'root',      // username
    'root',      // password
    {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: false,
        // Генерация внешних ключей этого типа 'user_id' вместо 'userId'
        underscored: true
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
)

module.exports = database