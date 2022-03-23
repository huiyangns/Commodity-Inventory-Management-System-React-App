import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Button, Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'

import './header.less'
import menuList from '../../config/config'
import {key, reqWeather} from '../../api/index'
import {resetUser} from '../../redux/actions'

const { confirm } = Modal;

class Header extends Component {
  state = {
    curTime: new Date().toLocaleString(),
    weather: '',
    temperature: '',
  }
  getCurTime = () => {
    this.timer1 = setInterval(() => {
      let curTime = new Date().toLocaleString()
      this.setState({curTime})
    }, 1000); 
  }

  getWeatherInfo = async () => {
    let response = await fetch('https://api.ipify.org/?format=json') //get user's current ip
    let {ip} = await response.json()
    response = await fetch(`https://ipapi.co/${ip}/json/`) // get latitude and longtitude
    let {latitude, longitude} = await response.json()
    let result = await reqWeather(latitude, longitude , key) //get city weather by lat & lon
    const {main:{temp}, weather} = result
    this.setState({temperature:temp,weather:weather[0].main}) 
  }
  //Get weather info every three hours
  getWeatherInfoPeriod =  () => {
    this.timer2 = setInterval(() => {
      this.getWeatherInfo()
    }, 1000*60*60*3);
    
  }
  // get menu title and showed on header part
  getTitle = () => {
     let path = this.props.location.pathname
     for (let item of menuList) {
      if (item.key === path){
        return item.title
      }
      if (item.children) {
        let cItem = item.children.find(cItem => path.startsWith(cItem.key))
        if (cItem) {
          return cItem.title
        } 
      }
     }
     
  }
  logout = () => {
    confirm({
      title: 'Do you Want to logout?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        this.props.resetUser()
      },
    }); 
  }
  componentDidMount() {
    this.getCurTime()
    this.getWeatherInfo()
    this.getWeatherInfoPeriod()
  }
  componentWillUnmount() {
    clearInterval(this.timer1)
    clearInterval(this.timer2)
  }

  render() {
    const {curTime, weather, temperature} = this.state
    // const title = this.getTitle()
    const title = this.props.headTitle
    return (
      <div className='header-container'>
        <div className="top">
          <span>Welcome, {this.props.user.username}</span>
          <Button type='link' onClick={this.logout}>Logout</Button>
        </div>
        <div className="bottom">
          <div className="left">{title}</div>
          <div className="right">
            <span>{curTime}</span>
            <span>{weather}</span>
            <span>{`${temperature} ℃`}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({headTitle: state.headTitle, user:state.user}),
  {resetUser}
)(withRouter(Header))