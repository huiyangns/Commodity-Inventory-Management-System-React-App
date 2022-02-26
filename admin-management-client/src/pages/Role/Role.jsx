import React, { Component } from 'react'
import {Card, Button, Table, Modal, message} from 'antd'
import {connect} from 'react-redux'

import {reqRoleList, reqAddRole, reqUpdateRole} from '../../api/index'
import AddForm from './AddForm'
import AuthForm from './AuthForm'
import {resetUser} from '../../redux/actions'

class Role extends Component {
  state = {
    roles : [],
    role:{},
    isShowAdd: false,
    isShowAuth: false,

  }
  auth = React.createRef()
  onRow = (role) => {
    return {
      onClick: event => {this.setState({role})}
      
    };
  }
  getRoles = async () => {
    const result = await reqRoleList()
    if (result.status === 0) {
      this.setState({
        roles: result.data
      })
    }
  }
  componentDidMount() {
      this.getRoles()
  }
  handleAdd = () => {
     this.form.validateFields()
      .then(async values => {
        this.setState({isShowAdd: false})
        const {roleName} = values

        const result = await reqAddRole(roleName)
        if (result.status === 0) {
          message.success('Add role successfully.')
          this.setState(state => ({
            roles:[...state.roles, result.data]
          }))
        }else {
          message.error('Add role failed.')
        }
      })
      .catch(err => console.log(err))
  }

  handleAuth = async () => {
    this.setState({isShowAuth: false})
     const {role} = this.state
     const menus = this.auth.current.getMenus()
     role.menus = menus
     role.auth_time = Date.now()
     role.auth_name = this.props.user.username
     const result = await reqUpdateRole(role)
     if (result.status === 0) {
       //update current role, needs relogin
       if (role._id === this.props.user.role._id) {
        message.success('Update current role of user. Pls relogin.')
        this.props.resetUser()
        return 
       }
       message.success('Update role successfully.')
      //  this.getRoles()
      
      let newRoles = this.state.roles.map((r) => {
          if (r._id === role._id) {
            r = {...role}
          }
          return r
      })
      
      this.setState({roles: newRoles})
     }else {
      message.error('Update role failed.')
     }
  }
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'Role Name',
        dataIndex: 'name',
      },
      {
        title: 'Create Time',
        dataIndex: 'create_time',
        render: (time) => new Date(time).toUTCString()
      },
      {
        title: 'Authorized Time',
        dataIndex: 'auth_time',
        render: (time) => time? new Date(time).toUTCString():null
      },
      {
        title: 'Authorizer',
        dataIndex: 'auth_name',
      },
    ]
  }
  render() {
    const {roles, role, isShowAdd, isShowAuth} = this.state
    const title = (
      <span>
        <Button type='primary' style={{marginRight:10}} onClick={() => this.setState({isShowAdd : true})}>Add Role</Button>
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({isShowAuth : true})}>Set Role Permission</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table 
          bordered
          rowKey='_id'
          dataSource={roles} 
          columns={this.columns} 
          pagination={{
            defaultPageSize:5,
            pageSizeOptions:[5,10,20,50,100],
            showSizeChanger: true,
            showQuickJumper:true
          }}
          rowSelection={{
            type:'radio', 
            selectedRowKeys:[role._id],
            onSelect: (role) => this.setState({role})
          }}
          onRow={this.onRow}
        />

        <Modal 
          title="Add Role" 
          visible={isShowAdd} 
          onOk={this.handleAdd} 
          onCancel={() => this.setState({isShowAdd : false})}
          destroyOnClose={true}
        >
        <AddForm setForm={(form) => this.form = form}/>
      </Modal>

        <Modal 
            title="Set Platform Permission" 
            visible={isShowAuth} 
            onOk={this.handleAuth} 
            onCancel={() => this.setState({isShowAuth : false})}
            destroyOnClose={true}
          >
          <AuthForm role={role} ref={this.auth}/>
        </Modal>
      </Card>
    )
  }
}

export default connect(
 state => ({user:state.user}),
 {resetUser}
)(Role)