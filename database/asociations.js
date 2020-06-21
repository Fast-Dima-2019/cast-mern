const User = require('./../models/User')
const Device = require('./../models/Device')

// One to many, 1 to N
User.hasMany(Device)
Device.belongsTo(User)


