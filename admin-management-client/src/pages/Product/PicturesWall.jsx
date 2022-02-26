import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import {reqDelImg} from '../../api/index'
import {BASE_IMG_URL} from '../../utils/constants'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  
  
  getImgs = () => {
      return this.state.fileList.map(file => file.name) 
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file, fileList }) => {
    // console.log('handleChange', file);
    if (file.status === 'done') {
        if (file.response.status === 0){
            message.success('Upload pics successfully.')
            const {name, url} = file.response.data
            fileList[fileList.length-1].name = name
            fileList[fileList.length-1].url = url
        }
        
    }else if (file.status === 'removed'){
        const result = await reqDelImg(file.name)
        if (result.status === 0) {
            message.success('Delete pic successfully.')
        }else {
            message.error('Delete pic failed.')
        }
    }
    this.setState({ fileList })
  }

  constructor(props) {
    super(props)
    let fileList = []
    const {imgs} = this.props
    if (imgs && imgs.length > 0) {
        fileList = imgs.map((img, index) => {
            return {
                uid: -index,
                name:img,
                status:'done',
                url:BASE_IMG_URL + img
            }
        })
    }
    this.state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList,
      }
  }
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          name='image'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

