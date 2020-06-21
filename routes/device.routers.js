const {Router} = require('express')
// const config = require('config')
const Device = require('./../models/Device')
const User = require('./../models/User')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    // console.log(req.body)
    // const {name, info} = req.body
    // console.log(dev_name, info, req.user.userId)
    // console.log(req.user.userId)

    const devices = await Device.create(
        {
          name: req.body.name,
          description: req.body.description,
          userId: req.user.userId
        }, {include: [User]}
    )
    res.status(201).json(devices)
    // .then(device => res.status(201).json({dev: device, msg: 'Устройство зарегистрировано'}))
    // .catch(err => res.status(500).json({msg: err.message}))

    // res.status(201).json({msg: 'Устройство зарегистрировано'})

  } catch (e) {
    res.status(500).join({msg: 'Something went wrong - что-то пошло не так'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const devices = await Device.findAll({
      include: {model: User, attributes: ['name']},
      where: {user_id: req.user.userId},
      attributes: ['id', 'name', 'description']
    })
    res.json(devices)
  } catch (err) {
    res.status(500).join({msg: 'что-то пошло не так', err: err.message})
  }
})

router.get('/:id', async (req, res) => {
  try {
    const devices = await Device.findByPk(req.params.id)
    res.json(devices)
  } catch (err) {
    res.status(500).join({msg: 'что-то пошло не так', err: err.message})
  }
})

module.exports = router

