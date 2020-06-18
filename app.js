const express = require('express')
const config = require('config')
// const path = require('path')
const db = require('./database/db')

const PORT = config.get(`port`) || 5000
// const PORT = process.env.PORT || 5000

// Чтобы иметь возможность заполнить req.body
const app = express()
app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routers'))
// app.use('/api/link', require('./routes/link.routes'))
// app.use('/t', require('./routes/redirect.routes'))

// if (process.env.NODE_ENV === 'production'){
//   app.use('/', express.static(path.join(__dirname, 'clients', 'build')))
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
//   })
// }

app.use((req, res) => {
  const err = new Error(`(${req.method}) URL not found -> ` + req.url)
  return res.status(403).json({status: 403, msg: err.message})
})


async function start() {
  try {
    await db.sync({force: true})
        // db.authenticate()
        .then(() => console.log('Подключение DB -> УСПЕШНО'))
        .catch(err => console.log('ошибка подключения', err))

    app.listen(PORT, () => console.log(`Server -> http://127.0.0.1:${PORT}`))

  } catch (err) {
    console.log(`Server error - ${err.message}`)
    process.exit(1)
  }
}

start()