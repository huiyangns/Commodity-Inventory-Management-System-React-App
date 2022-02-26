import React, { Component } from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './pages/Login/Login'
import Admin from './pages/Admin/Admin'
import './App.less'

export default class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
            <Route path='/login' component={Login}/>
            <Route path='/' component={Admin}/>
        </Switch>
      </HashRouter>
    )
  }
}
