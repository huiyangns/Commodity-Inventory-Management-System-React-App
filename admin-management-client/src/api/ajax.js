import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, method='get') {
    // deal with network request error here, so we can only pay attention to successful scenario in await
    return new Promise((resolve, reject) => {
        let promise
        if (method === 'get') {
            promise = axios({
                url,
                method,
                params: data
            })
        } else {
            promise = axios({
               url,
               method,
               data
           })
        }
        promise.then(response => resolve(response.data)).catch(error => message.error('Network error happens'))
    })
}