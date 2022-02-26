import React, { Component } from 'react'
import { Form, Input} from 'antd';

export default class AddForm extends Component {
    formRef = React.createRef()
    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

  render() {
      
    return (
     <Form ref={this.formRef}>
        <Form.Item 
            name="roleName" 
            label="RoleName:" 
            rules={[{ required: true, message:'Role name cannot be null.' }]}
            labelCol={{span:4}}
            wrapperCol={{span:15}}
        >
            <Input placeholder='Pls enter role name'/>
      </Form.Item>
     </Form>
    )
  }
}
