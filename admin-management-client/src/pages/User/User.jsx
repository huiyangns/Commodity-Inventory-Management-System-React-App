import React, { Component } from 'react'
import {Card, Button, Table, message, Modal} from 'antd'
import {ExclamationCircleOutlined} from '@ant-design/icons'

import {reqUserList, reqDelUser, reqAddUser} from '../../api/index'
import UserForm from './UserForm'

export default class User extends Component {
  state = {
    users:[],
    roles:[],
    isShow: false,
  }
  getUsers = async() => {
    const result = await reqUserList()
    if (result.status === 0) {
      const {users, roles} = result.data
      this.setState({users, roles})
    }
  }

  handleAddOrUpdate = async () => {
     this.setState({isShow: false})
     const user = this.form.getFieldsValue()
     if (this.user) {
       user._id = this.user._id
     }
     const result = await reqAddUser(user)
     if (result.status === 0) {
       message.success(`${this.user ? 'Modify' : 'Add'} user successfully.`)
       this.getUsers()
     }
  }
  delUser = (user) => {
    Modal.confirm({
      title: `Do you Want to delete ${user.username}?`,
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        const result = await reqDelUser(user._id)
        if (result.status === 0) {
          message.success('Delete user successfully.')
          this.getUsers()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  modifyUser = (user) => {
     this.user = user
     this.setState({isShow: true})
  }
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'User Name',
        dataIndex: 'username',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
      },
      {
        title: 'Registration Time',
        dataIndex: 'create_time',
        render: (create_time) => {
           return new Date(create_time).toUTCString()
        }
      },
      {
        title: 'Role',
        dataIndex: 'role_id',
        render: (role_id) => {
           return this.state.roles.find(role => role._id === role_id).name
        }
      },
      {
        title: 'Operation',
        render: (text, record, index) => {
          return (
            <span>
              <Button type='link' onClick={() => this.modifyUser(record)}>Modify</Button>
              <Button type='link' onClick={() => this.delUser(record)}>Delete</Button>
            </span>
          )
        }
      },
    ]
  }

  componentDidMount() {
      this.getUsers()
  }
  render() {
    const {users, isShow, roles} = this.state
    const user = this.user || {}
    const title = (
          <Button type='primary' onClick={() => {
            this.setState({isShow: true})
            this.user = null
          }}>Add User</Button>
    )

    return (
      <Card title={title} >
        <Table 
          bordered
          rowKey='_id'
          dataSource={users} 
          columns={this.columns} 
          pagination={{
            defaultPageSize:5,
            pageSizeOptions:[5,10,20,50,100],
            showSizeChanger: true,
            showQuickJumper:true
          }}
        />
        <Modal 
          title={`${user._id ? 'Modify' : 'Add'} User`}
          visible={isShow} 
          onOk={this.handleAddOrUpdate} 
          onCancel={() => this.setState({isShow: false})}
          destroyOnClose={true}

        >
          <UserForm setForm={(form) => this.form = form} roles={roles} user={user}></UserForm>
      </Modal>
      </Card>
    )
  }
}
