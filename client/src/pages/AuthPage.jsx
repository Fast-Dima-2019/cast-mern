import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/msg.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = (props) => {
  const auth = useContext(AuthContext)
  const {loading, request, error, clearError} = useHttp()
  const msg = useMessage()

  const [form, setForm] = useState({
    name: '', email: '', password: ''
  })

  useEffect(() => {
    msg(error)
    clearError()
  }, [error, msg, clearError])

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const changeHandler = event => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      // console.log('Data - register:', data)
      msg(data.msg)
    } catch (e) {
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      // console.log('Data - register:', data)
      // msg(data.msg)
      auth.login(data.token, data.userId)
    } catch (e) {
    }
  }

  return <>
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Мониторинг</h3>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>

            <div>
              <div className="input-field">
                <input
                    placeholder="Ввведите name"
                    id="name" name="name"
                    type="text"
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <label htmlFor="name">Name</label>
              </div>

              <div className="input-field">
                <input
                    placeholder="Ввведите email"
                    id="email" name="email"
                    type="text"
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                    placeholder="Ввведите пароль"
                    id="password" name="password"
                    type="password"
                    className="yellow-input"
                    onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>

          </div>
          <div className="card-action">
            <button
                className="btn yellow darken-4"
                style={{marginRight: 10}}
                onClick={loginHandler}
                disabled={loading}
            >Войти
            </button>
            <button
                className="btn grey lighten-1 black-text"
                onClick={registerHandler}
                disabled={loading}
            >Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}