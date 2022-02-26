import React, { Component } from 'react'
import ReactECharts from 'echarts-for-react'
import {Card, Button} from 'antd'

export default class Line extends Component {
  state = {
    sales : [5, 20, 36, 10, 10, 20],
    store : [10, 15, 6, 15, 8, 16],
  }

  update = () => {
    this.setState({
      sales: this.state.sales.map((sale) => sale+1),
      store: this.state.store.map((s) => s-1 >= 0 ? s-1:0)
    }) 
  }
  getOption = (sales, store) => {
    return {
      title: {
        text: 'ECharts'
      },
      tooltip: {},
      legend: {
        data: ['Sales', 'Store']
      },
      xAxis: {
        data: ['Shirt', 'cardigan', 'chiffon', 'pants', 'high heels', 'socks']
      },
      yAxis: {},
      series: [
        {
          name: 'Sales',
          type: 'line',
          data: sales
        },
        {
          name: 'Store',
          type: 'line',
          data: store
        }
      ]
    }
  }
  render() {
    const {sales, store} = this.state
    return (
      <Card title={<Button type='primary' onClick={this.update}>Update</Button>}>
      <ReactECharts option={this.getOption(sales, store)} />
      </Card>
    )
  }
}
