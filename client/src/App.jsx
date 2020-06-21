import React from 'react'
import 'materialize-css'
import {useRoutes} from './Routes'
import {BrowserRouter} from 'react-router-dom'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader';

function App() {
  const {login, logout, token, userId, ready} = useAuth()
  const isAuthenticated = !!token // !! Приводит к boolean type
  const routes = useRoutes(isAuthenticated)

  if (!ready) {
    return <Loader/>
  }

  return <>
    <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
      <BrowserRouter>
        {isAuthenticated && <Navbar/>}
        <div className='container'>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  </>
}

export default App
