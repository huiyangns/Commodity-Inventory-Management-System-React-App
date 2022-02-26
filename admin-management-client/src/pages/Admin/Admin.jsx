import React, { Component } from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd'
import {connect} from 'react-redux'

// import memoryUtil from '../../utils/memoryUtil';
import Header from '../../components/Header/Header'
import LeftNav from '../../components/LeftNav/LeftNav'
import Home from '../Home/Home'
import Category from '../Category/Category'
import Product from '../Product/Product'
import Role from '../Role/Role'
import User from '../User/User'
import Pie from '../Charts/Pie'
import Line from '../Charts/Line'
import Bar from '../Charts/Bar'

import './admin.less'

const {Sider, Content } = Layout;


class Admin extends Component {
  render() {
    // const user = memoryUtil.user
    const {user} = this.props
    if (!user._id){
      return <Redirect to='/login'/>
    }
    return (
      <Layout className='layout-container'>
        <Sider>
          <LeftNav/>
        </Sider>
        <Layout className='layout-right'>
          <Header>Header</Header>
          <Content className='content'>
            <Switch>
            <Route path='/home' component={Home}/>
              <Route path='/category' component={Category}/>
              <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/home' />
            </Switch>
          </Content>
          <div className="footer">Browsing with Chrome will get a better experience</div>
          {/* <Footer style={{textAlign:'center', color:'#bbb'}}>Browsing with Chrome will get a better experience</Footer> */}
        </Layout>
    </Layout>
    )
  }
}

export default connect(
 state => ({user: state.user}),
 {}
)(Admin)