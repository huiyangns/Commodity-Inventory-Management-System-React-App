import React, { Component } from 'react'
import { Form, Input } from 'antd';

export default class UpdateForm extends Component {
  formRef = React.createRef()
  componentDidMount() {
    this.props.setForm(this.formRef.current)
  }
  render() {
    const {name} = this.props.category
    return (
     <Form layout='vertical' ref={this.formRef} initialValues={{categoryName:name}}>
        <Form.Item name="categoryName" label="CategoryName:" rules={[{ required: true, message:'Category name cannot be null.' }]}>
            <Input placeholder='Pls enter category name'/>
      </Form.Item>
     </Form>
    )
  }
}
