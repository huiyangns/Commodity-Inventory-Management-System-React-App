import React, { Component } from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu } from 'antd'
import {connect} from 'react-redux'

import './leftNav.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/config';
// import memoryUtil from '../../utils/memoryUtil'
import {setHeaderTitle} from '../../redux/actions'

const { SubMenu } = Menu;

class LeftNav extends Component {

  hasAuth = (item) => {
    // const menus = memoryUtil.user.role.menus
    const menus = this.props.user.role.menus

    // const username = memoryUtil.user.username
    const username = this.props.user.username
    if (username === 'admin' || item.isPublic || menus.includes(item.key)) {
      return true
    }else if (item.children) {
      return !!item.children.find(c => menus.includes(c.key))
    }
    return false
  }
  //recursively generate menus
  getMenuNodes = (menuList) => {
    
     return menuList.map((item) => {
       if (this.hasAuth(item)) {
        const path = this.props.location.pathname
        if (path.startsWith(item.key)){
          this.props.setHeaderTitle(item.title)
        }
         if (!item.children){
          return (
              <Menu.Item key={item.key} icon={item.icon}>
                <Link to={item.key} onClick={() => this.props.setHeaderTitle(item.title)}>
                  {item.title}
                 </Link>
              </Menu.Item>
          )
        }else {
          
          const childrenItem = item.children.find(cItem => path.startsWith(cItem.key))
          if (childrenItem) {
            this.openKey = item.key // menu whose sub-menu equals to path will be open by default.
          }
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenuNodes(item.children)}
            </SubMenu>
          )
        }
       }else {
         return null
       }
        
     })
  }
  constructor(props) {
    super(props)
    this.menuNodes = this.getMenuNodes(menuList)
  }
  render() {
    let path = this.props.location.pathname
    if (path.startsWith('/product')){
      path = '/product'
    }
    return (
      <div className='leftNav-container'>
        <Link to='/' className='header'>
          <img src={logo} alt="logo" />
          <h1>Management System</h1>
        </Link>

        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[this.openKey]}
          mode="inline"
          theme="dark"
        >
          {this.menuNodes}
          
        </Menu>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {setHeaderTitle}
)(withRouter(LeftNav))