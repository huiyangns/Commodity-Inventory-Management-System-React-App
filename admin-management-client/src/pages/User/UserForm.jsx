import React, { Component } from 'react'
import { Form, Input, Select} from 'antd';

const {Option} = Select

export default class UserForm extends Component {
    formRef = React.createRef()
    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

  render() {
      const {roles, user} = this.props
    return (
     <Form 
     ref={this.formRef}
     labelCol={{span:5}}
     wrapperCol={{span:15}}
     >
        <Form.Item 
            name="username" 
            label="Username:" 
            initialValue={user.username}
            rules={[{ required: true, message:'User name cannot be null.' }]}
        >
            <Input placeholder='Pls enter user name'/>
      </Form.Item>
      {
        user._id ? null : (
          <Form.Item 
            name="password" 
            label="Password:" 
            initialValue={user.password}
            rules={[{ required: true, message:'Password cannot be null.' }]}
        >
            <Input placeholder='Pls enter password'/>
      </Form.Item>
        )
      }

      <Form.Item 
            name="phone" 
            label="Phone:" 
            initialValue={user.phone}
        >
            <Input placeholder='Pls enter phone number'/>
      </Form.Item>

      <Form.Item 
            name="email" 
            label="Email:" 
            initialValue={user.email}
        >
            <Input placeholder='Pls enter email'/>
      </Form.Item>

      <Form.Item 
            name="role_id" 
            label="Role:" 
            initialValue={user.role_id}
        >
            <Select >
              {
                roles.map((role) => {
                   return (
                    <Option key={role._id} value={role._id}>{role.name}</Option>
                   )
                })
              }
            </Select>
      </Form.Item>
     </Form>
    )
  }
}
