const {Model, DataTypes} = require('sequelize')
const sequelize = require('../database/db')

class User extends Model {
}
 
User.init({
      name: {
        type: DataTypes.STRING, allowNull: false,
        validate: {
          isAlpha: {msg: 'Name -> только латинские буквы'},
          len: {args: [3, 254], msg: 'Name -> только 3-254 символа'}
        }
      },
      email: {
        type: DataTypes.STRING, allowNull: false, unique: true,
      },
      password: {
        type: DataTypes.STRING, allowNull: false,
      },
      role: {
        type: DataTypes.INTEGER, defaultValue: 0,
      },
    },
    {sequelize, modelName: 'user'}
)

module.exports = User
