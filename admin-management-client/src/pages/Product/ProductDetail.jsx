import React, { Component } from 'react'
import {Card, List, Button} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import {BASE_IMG_URL} from '../../utils/constants'
import {reqCategoryById} from '../../api/index'

const {Item} = List
export default class ProductDetail extends Component {
  state = {
    cName1:'',
    cName2:'',
  }
  async componentDidMount() {
    const {pCategoryId, categoryId} = this.props.location.state
    if (pCategoryId === '0') {
      const result = await reqCategoryById(pCategoryId)
      if (result.status === 0){
        const cName1 = result.data.name
        this.setState({cName1})
      }
    }else {
      const results = await   Promise.all([reqCategoryById(pCategoryId), reqCategoryById(categoryId)])
      const cName1 = results[0].data.name
      const cName2 = results[1].data.name
      this.setState({cName1, cName2})
    }
  }
  render() {
    const {imgs, name, desc, price, detail} = this.props.location.state || {}
    const {cName1, cName2} = this.state
    const title = (
      <span>
        <Button type='link' icon={<ArrowLeftOutlined/>} onClick={evt => this.props.history.goBack()}></Button>
        <span>Product Detail</span>
      </span>
    )
    return (
     <Card title={title}>
       <List className='detail-list-container'>
          <Item className='item'>
            <span className='left'>Name:</span>
            <span className='right'>{name}</span>
          </Item>
          <Item className='item'>
            <span className='left'>Desc:</span>
            <span className='right'>{desc}</span>
          </Item>
          <Item className='item'>
            <span className='left'>Price:</span>
            <span className='right'>{price}</span>
          </Item>
          <Item className='item'>
            <span className='left'>Category:</span>
            <span className='right'>{cName1}{cName2 ? ' --> ' + cName2 : null}</span>
          </Item>
          <Item className='item'>
            <span className='left'>Pics:</span>
            <span className='right'>
              {
                imgs?.map((img) => {
                  return <img key={img} src={BASE_IMG_URL + img} alt="123" />
                })
              }
            </span>
          </Item>
          <Item className='item'>
            <span className='left'>Details:</span>
            <span className='right' dangerouslySetInnerHTML={{__html: detail}}>
              
            </span>
          </Item>
       </List>
     </Card>
    )
  }
}
