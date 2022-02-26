import React, { Component } from 'react'
import {Card, Table, Input, Select, message, Button} from 'antd'
import {Link} from 'react-router-dom'
import {PlusOutlined} from '@ant-design/icons'

import {reqProducts, reqSearchProducts, reqUpdateStatus} from '../../api/index'

const {Option} = Select

export default class ProductHome extends Component {
    state = {
        products:[],
        total:0,
        searchType:'productName',
        searchKey:'',
    }
    getProducts = async (pageNum=1, pageSize=5) => {
        this.pageNum = pageNum // update status in other pages, not in pageNum 1, so it needs remember current page
        const {searchKey, searchType} = this.state
        let result
        if (searchKey) { // search products by name or description
            result = await reqSearchProducts({pageNum, pageSize, searchKey, searchType})
        }else { // get product based on backend pagination
            result = await reqProducts(pageNum, pageSize)
        }
         if (result.status === 0) {
             const {list, total} = result.data  
             this.setState({
                 total,
                 products:list
             })
         }
    }
    updateStatus = async (product) => {
         const {_id, status} = product
         const result = await reqUpdateStatus(_id, status===1?2:1)
         if (result.status === 0){
             message.success('Update product status successfully.')
             this.getProducts(this.pageNum)
         }else {
            message.error('Update product status failed.')
         }
    }
    constructor(props){
        super(props)
        this.columns = [
            {
              title: 'Product Name',
              dataIndex: 'name',
              
            },
            {
                title: 'Product Description',
                dataIndex: 'desc',
            },
            {
                title: 'Product Price',
                dataIndex: 'price',
                render: (price) => '$' + price
            },
            {
                width:150,
                title: 'Status',
                render: (text, record, index) => {
                    return (
                    <span>
                        <Button type='primary' onClick={e => this.updateStatus(record)}>{record.status === 1? 'Off Shelves' : 'On Shelves'}</Button>
                        <span>{record.status === 1 ? 'On Sale':'Sold Out'}</span>
                    </span>
                )}
            },
            {   
                width:120,
                title: 'Operation',
                render: (text, record, index) => (
                    <div style={{textAlign:'center'}}>
                        <Link to={{pathname:'/product/detail', state:record}}>Detail</Link><br/>
                        <Link to={{pathname:'/product/addupdate', state:record}}>Update</Link>
                    </div>
                )
            },
        ]
    }
    componentDidMount() {
        this.getProducts()
    }
  render() {
      const {searchType, searchKey} = this.state
      const title = (
          <span>
              <Select 
                value={searchType} 
                style={{width:150}}
                onChange={value => this.setState({searchType:value})}
                >
                  <Option value='productName'>search by name</Option>
                  <Option value='productDesc'>search by desc</Option>
              </Select>
              <Input 
                placeholder='keyword' 
                style={{width:200, margin:'0 15px'}} 
                value={searchKey}
                onChange={event => this.setState({searchKey: event.target.value})}
                ></Input>
              <Button type='primary' onClick={e => this.getProducts()}>Search</Button>
          </span>
      )
      
    const extra = (<Button type='primary' icon={<PlusOutlined />} onClick={e => this.props.history.push('/product/addupdate')}>Add Product</Button>)

    const {products} = this.state

    return (
      <Card title={title} extra={extra}>
          <Table 
          bordered
          rowKey='_id'
          dataSource={products} 
          columns={this.columns} 
          pagination={{
            current:this.pageNum,
            defaultPageSize:5,
            pageSizeOptions:[5,10,20,50,100],
            showSizeChanger: true,
            showQuickJumper:true,
            onChange:this.getProducts
          }}
        />
      </Card>
    )
  }
}
