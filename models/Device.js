const { Model, DataTypes } = require('sequelize')
const sequelize = require('./../database/db')
const User = require('./User')

class Device extends Model {}

Device.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    autoIncrement: false,
    // unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {args: [3, 254], msg: 'devName -> от 3 до 253 символов'}
    }
  },
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'device'
})

module.exports = Device