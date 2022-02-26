import React, { Component } from 'react'
import {Card, Form, Button, Input, Cascader, message } from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import {reqCategorys, reqAddOrUpdateProduct} from '../../api/index'
import PicturesWall from './PicturesWall'
import RichTextEditor from './RichTextEditor'

const { TextArea } = Input

export default class ProductAddUpdate extends Component {
  state = {
    options:[]
  }
  onFinish = async (values) => {
    const {name, desc, price, categorys} = values
    let pCategoryId, categoryId
    if (categorys.length === 1) {
      pCategoryId = '0'
      categoryId = categorys[0]
    }else {
      pCategoryId = categorys[0]
      categoryId = categorys[1]
    }
    const imgs = this.pw.getImgs()
    const detail = this.editor.getDetail()
    const product = {
      name, desc, price,pCategoryId,categoryId,imgs, detail
    }
    if (this.isUpdate) {
      product._id = this.product._id
    }
    const result = await reqAddOrUpdateProduct(product)
    if (result.status === 0){
      message.success(`${this.isUpdate?'Update':'Add'} product successfully.`)
      this.props.history.goBack()
    }else {
      message.error(`${this.isUpdate?'Update':'Add'} product failed.`)

    }
    //  console.log(values);
    //  console.log(this.pw.getImgs());
    //  console.log(this.editor.getDetail());
  }
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }

  loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const childrenOptions = await (this.getCategorys(targetOption.value))
    targetOption.loading = false;
    if (childrenOptions && childrenOptions.length > 0) { // first class category has subcategorys
      targetOption.children = childrenOptions.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true,
      }))
      
    }else {
      targetOption.isLeaf = true // first class category has no subcategorys
    }
    this.setState({options:[...this.state.options]});
  }
  getCategorys = async (parentId = '0') => {
    const categorys = await reqCategorys(parentId)
    if (categorys.status === 0) {
      if (parentId === '0') { // get first class categorys
        const options = categorys.data.map(c => ({
          value: c._id,
          label: c.name,
          isLeaf: false,
        }))
        const {isUpdate, product} = this
        const {pCategoryId} = product
        if (isUpdate){ //update product branch
          if (pCategoryId !== '0'){ //product is under subcategory 
            const childrenOptions = await this.getCategorys(pCategoryId)
            const targetOption = options.find(c => c.value === pCategoryId)
            targetOption.children = childrenOptions.map(c => ({
              value: c._id,
              label: c.name,
              isLeaf: true,
            }))
          }
        }
        this.setState({options})
      }else { //get sub categorys
        return categorys.data
      }
      
      
    }
  }
  constructor(props) {
    super(props)
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
  }
   componentDidMount() {
      this.getCategorys()
  }
  render() {
    const {isUpdate, product} = this
    const {pCategoryId, categoryId, imgs, detail} = product
    let categorys = []
    if (isUpdate) {
      if (pCategoryId === '0') {
        categorys.push(categoryId)
      }else {
        categorys.push(pCategoryId)
        categorys.push(categoryId)

      }
    }
    const title = (
      <span>
        <Button type='link' icon={<ArrowLeftOutlined/>} onClick={evt => this.props.history.goBack()}></Button>
        <span>{isUpdate? 'Update Product': 'Add Product'}</span>
      </span>
    )
    return (
      <Card title={title}>
          <Form
            name="basic"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 8 }}
            onFinish={this.onFinish}
            initialValues={{
              name: product.name,
              desc: product.desc,
              price: product.price,
              categorys
            }}
          >
            <Form.Item
              label="Product Name:"
              name="name"
              rules={[{ required: true, message: 'Please input Product Name!' }]}
            >
              <Input placeholder='Input product name'/>
            </Form.Item>

            <Form.Item
              label="Product Desc:"
              name="desc"
              rules={[{ required: true, message: 'Please input Product description!' }]}
            >
              <TextArea
                placeholder="Input Product description"
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
            </Form.Item>

            <Form.Item
              label="Product Price:"
              validateFirst={true}
              name="price"
              rules={[
                { required: true, message: 'Please input Product Price!' },
                {validator: (_, value) =>
                  value*1 > 0 ? Promise.resolve() : Promise.reject(new Error('Price must be greater or equal one at least'))}
              
              ]}
            >
              <Input type='number' addonBefore="$" placeholder='Input product name'/>
            </Form.Item>

            <Form.Item
              label="Product Category:"
              name="categorys"
              rules={[{ required: true, message: 'Please select Product Category!' }]}
            >
              <Cascader 
                options={this.state.options} 
                loadData={this.loadData} 
                onChange={this.onChange} 
                changeOnSelect />
            </Form.Item>
            
            <Form.Item
              label="Product Pics:"
              name="imgs"
            >
              <PicturesWall ref={c => this.pw = c} imgs={imgs}/>
            </Form.Item>

            <Form.Item
              label="Product Detail:"
              name="detail"
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 20 }}
            >
              <RichTextEditor ref={c => this.editor = c} detail={detail}/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 1, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
      </Card>
    )
  }
}
