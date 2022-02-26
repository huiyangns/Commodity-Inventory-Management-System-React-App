import {message} from 'antd'
import {SET_HEADER_TITLE, RECEIVE_USER, RESET_USER} from './action-types'
import {reqLogin} from '../api/index'
import storageUtil from '../utils/storageUtil'

export const setHeaderTitle = (title) => ({type:SET_HEADER_TITLE, data:title})
export const receiveUser = (user) => ({type:RECEIVE_USER, data: user})
export const resetUser = () => {
    storageUtil.removeUser()
    return {type:RESET_USER, data:{}}
}

export const login = (username, password) => {
    return async dispatch => {
        const result = await reqLogin(username, password)
        if (result.status === 0) {
            storageUtil.setUser(result.data)
            dispatch(receiveUser(result.data))
        }else {
            message.error('Username or password wrong!')
        }
    }
}