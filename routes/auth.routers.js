const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const User = require('./../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()

// url - /api/auth/register
router.post('/register',
    [
      check('email', `Некорректный email`).isEmail(),
      check('password', `пароль >= 5 символов`).isLength({min: 5}),
    ],
    async (req, res) => {
      try {

        const errValid = await validationResult(req)
        if (!errValid.isEmpty()) {
          // console.log(errValid.errors[0].msg)
          return res.status(403).json({msg: 'регистрация -> ' + errValid.errors[0].msg})
        }

        const {name, email, password, role} = req.body
        // Search user
        const data = await User.findOne({where: {email: email}})
        if (data) {
          return res.status(403).json({msg: 'User already exists'})
        }

        const hashPwd = await bcrypt.hash(password, 12)
        User.create({name: name, email: email, password: hashPwd, role: role})
            .then(user => res.status(201).json({user: user, msg: 'User created'}))
            .catch(err => res.status(500).json({msg: err.message}))

      } catch (e) {
        res.status(500).json({msg: 'Что-то пошло не так - register', err: e.message})
      }
    }
)

// url - /api/auth/login
router.post('/login',
    [
      check('email', `Некорректный email`).normalizeEmail().isEmail(),
      check('password', `Пустой пароль`).exists(),
    ],
    async (req, res) => {
      try {
        const errValid = validationResult(req)
        if (!errValid.isEmpty()) {
          return res.status(403).json({err: errValid.array(), msg: `Некорректные данные`})
        }

        const {email, password} = req.body
        const user = await User.findOne({where: {email: email}})
        if (!user) {
          return res.status(403).json({msg: `Неверные данные (пользователь)`})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
          return res.status(403).json({msg: `Неверные данные (пароль)`})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'},
        )
        res.status(200).json({token, userId: user.id, msg: 'Доступ разрешен'})
      } catch (e) {
        res.status(500).json({msg: 'Что-то пошло не так - login', err: e.message})
      }
    })

module.exports = router