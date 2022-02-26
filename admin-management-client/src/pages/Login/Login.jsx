import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import {connect} from 'react-redux'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import logo from '../../assets/images/logo.png'
import './login.less'

import {login} from '../../redux/actions'

class Login extends Component {
  onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    const {username, password} = values
    this.props.login(username, password)
  }
  render() {
    const {user} = this.props
    if (user._id) {
      return <Redirect to='/home'/>
    }
    return (
      <div className="login-container">
        <header className="header">
          <img src={logo} alt="logo" />
          <h1>React Project: Backstage Management System</h1>
        </header>
        <section className="content">
          <h2>Login</h2>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              validateFirst={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
                {
                  type:'string',
                  min: 4,
                  message: 'Username length is at least 4',
                },
                {
                  type:'string',
                  max: 12,
                  message: 'Username length is at most 12',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: 'Character, digit and underline only',
                },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              validateFirst={true}
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
                {
                  type:'string',
                  min: 4,
                  message: 'Password length is at least 4',
                },
                {
                  type:'string',
                  max: 12,
                  message: 'Password length is at most 12',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: 'Character, digit and underline only',
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default connect(
 state => ({user: state.user}),
 {login}
)(Login)