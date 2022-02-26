import React, { Component } from 'react'
import {Card, Button, Table, message, Modal} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'

import {reqCategorys, reqUpdateCategory, reqAddCategory} from '../../api/index'
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'

export default class Category extends Component {
  state = {
    categorys: [], // first class categorys
    Subcategorys: [], // sub categorys
    parentId:'0',
    parentName:'',
    isModalVisible: 0, //0 invisible; 1 show add modal; 2 show modify modal

  }
  getCategorys = async (pId) => {
    const parentId = pId || this.state.parentId
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') { // get first class categorys
        this.setState({categorys})
      }else { // get sub categorys
        this.setState({Subcategorys:categorys})
      }
      
    }else {
      message.error('Get category list failed.')
    }
  }
  showSubCategorys = (record) => {
    // update state and get sub categorys
    this.setState({
      parentId: record._id,
      parentName: record.name,
    }, () => {
      this.getCategorys() 
    })

  }
  backToFirst = () => {
    this.setState(
      {
        parentId:'0',
        parentName:'',
        Subcategorys:[],
      }
    ) 
  }
  showAdd = () => {
    this.setState({isModalVisible:1}) 
  }
  handleAdd = () => {
    this.form.validateFields() //verify form when submit
      .then(async (values) => {
        this.setState({isModalVisible:0}) 
        const {parentId, categoryName} = this.form.getFieldsValue()
        // console.log({parentId, categoryName});
        const result = await reqAddCategory(parentId, categoryName)
        if (result.status === 0) {
          message.success('Add category successfully.')
          if (parentId === this.state.parentId) { //in order to show new category, it needs to getCategorys
            this.getCategorys()
          }else if (parentId === '0'){ //add first class category when locating on sub category(not change parentId in state)
            this.getCategorys('0')
          }
        }
      })
      .catch((errorInfo) => {
         console.log(errorInfo)
      })
    
  }
  showModify = (record) => {
    this.setState({isModalVisible:2}) 
    this.category = record
  }
  handleModify = () => {
    this.form.validateFields()//verify form when submit
      .then(async (values) => {
        const categoryId = this.category._id
        const {categoryName} = values
        this.setState({isModalVisible:0}) 
         const result = await reqUpdateCategory(categoryId, categoryName)
         if (result.status === 0) {
           message.success('Modify category successfully.')
           this.getCategorys()
         }else {
          message.error('Modify category fail.')
         }
      })
      .catch((errorInfo ) => {
         console.log(errorInfo)
      })
    
  }
  handleCancel = () => {
    this.setState({isModalVisible:0}) 
  }
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'Category Name',
        dataIndex: 'name',
        
      },
      {
        title: 'Operation',
        width:300,
        render: (text, record, index) => {
          return (
            <span>
              <Button type='link' onClick={() => this.showModify(record)}>Modify</Button>
              {this.state.parentId === '0' ? <Button type='link' onClick={() => this.showSubCategorys(record)}>Sub Category</Button>: null}
            </span>
          )
        }
      },
    ]
  }
  componentDidMount() {
    this.getCategorys()
  }
  render() {
    const {categorys,Subcategorys, parentId, parentName, isModalVisible} = this.state
    
    const title = (
      parentId === '0' ? "First Class Category" : (
        <span>
          <Button type='link' onClick={this.backToFirst}>First Class Category</Button>
          <ArrowRightOutlined />
          <span style={{marginLeft: 5}}>{parentName}</span>
        </span>
      )
    )
    const extra = (<Button type='primary' icon={<PlusOutlined />} onClick={this.showAdd}>Add</Button>)
    return (
      <Card title={title} extra={extra} >
        <Table 
          bordered
          rowKey='_id'
          dataSource={parentId === '0' ? categorys : Subcategorys} 
          columns={this.columns} 
          pagination={{
            defaultPageSize:5,
            pageSizeOptions:[5,10,20,50,100],
            showSizeChanger: true,
            showQuickJumper:true
          }}
        />
        <Modal 
          title="Add Category" 
          visible={isModalVisible === 1} 
          onOk={this.handleAdd} 
          onCancel={this.handleCancel}
          destroyOnClose={true}

        >
        <AddForm categorys={categorys} parentId={parentId} setForm={(form) => this.form = form}/>
      </Modal>
      <Modal 
        title="Modify Category" 
        visible={isModalVisible === 2} 
        onOk={this.handleModify} 
        onCancel={this.handleCancel}
        destroyOnClose={true}
      >
        <UpdateForm category={this.category || {}} setForm={(form) => this.form = form}/>
      </Modal>
    </Card>
    )
  }
}

