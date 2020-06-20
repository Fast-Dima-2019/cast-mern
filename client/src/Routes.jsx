import React, {Fragment} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {DevicePage} from './pages/DevicePage'
import {CreatePage} from './pages/CreatePage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'

export const useRoutes = (isAuthenticated) => {

  if (isAuthenticated) {
    return (
        <Switch>
          <Route path='/device' exact>
            <DevicePage/>
          </Route>
          <Route path='/create' exact>
            <CreatePage/>
          </Route>
          <Route path='/detail/:id'>
            <DetailPage/>
          </Route>
          <Redirect to='/create'/>
        </Switch>
    )
  }

  return <Fragment>
    <Switch>
      <Route path='/' exact>
        <AuthPage/>
      </Route>
      <Redirect to='/'/>
    </Switch>
  </Fragment>
}