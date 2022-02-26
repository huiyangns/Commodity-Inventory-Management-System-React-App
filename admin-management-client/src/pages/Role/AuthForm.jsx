import React, { Component } from 'react'
import { Form, Input, Tree} from 'antd';

import menuList from '../../config/config'
export default class AuthForm extends Component {
  
   onCheck = (checkedKeysValue) => {
    console.log('onCheck', checkedKeysValue);
    this.setState({checkedKeys: checkedKeysValue})
  };

  getMenus = () => {
    return this.state.checkedKeys
  }
  constructor(props) {
    super(props)
    this.treeData = [{
      title: 'Platform Permissions',
      key: 'all',
      children: []
    }
    
  ]
  this.treeData[0].children = menuList
  this.state = {
    checkedKeys: this.props.role.menus
  }
  }
  render() {
    const {role} = this.props
    const {checkedKeys} = this.state
    return (
     <div >
       <Form>
        <Form.Item 
              name="roleName" 
              label="RoleName:" 
              labelCol={{span:4}}
              wrapperCol={{span:15}}
              initialValue={role.name}
          >
              <Input disabled/>
        </Form.Item>
       </Form>
      <Tree
      checkable
      defaultExpandAll={true}
      treeData={this.treeData}
      checkedKeys={checkedKeys}
      onCheck={this.onCheck}
    />
     </div>

    )
  }
}
