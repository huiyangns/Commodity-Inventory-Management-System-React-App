import React, { Component } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProductHome from './ProductHome'
import ProductAddUpate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'
import './product.less'

export default class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path='/product' component={ProductHome} exact></Route>
        <Route path='/product/addupdate' component={ProductAddUpate}></Route>
        <Route path='/product/detail' component={ProductDetail}></Route>
        <Redirect to='/product'/>
      </Switch>
    )
  }
}
