import {createContext} from 'react'

function noop() {} // Пустая функция - ничего не делает.

export const AuthContext = createContext({
  token:null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})
