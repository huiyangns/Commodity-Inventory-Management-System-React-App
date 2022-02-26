import React, { Component } from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select;
export default class AddForm extends Component {
    formRef = React.createRef()
    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

  render() {
      const {categorys, parentId} = this.props
    return (
     <Form layout='vertical' ref={this.formRef}>
         <Form.Item name="parentId" initialValue={parentId} label="Current Category:" rules={[{ required: true }]}>
            <Select
            >
            <Option value="0">First class category</Option>
            {
                categorys.map((category) => {
                    return <Option key={category._id} value={category._id}>{category.name}</Option>
                })
            }
            </Select>
        </Form.Item>
        <Form.Item name="categoryName" label="CategoryName:" rules={[{ required: true, message:'Category name cannot be null.' }]}>
            <Input placeholder='Pls enter category name'/>
      </Form.Item>
     </Form>
    )
  }
}
