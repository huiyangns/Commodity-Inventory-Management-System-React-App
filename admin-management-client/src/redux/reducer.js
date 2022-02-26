import {combineReducers} from 'redux'

import storageUtil from '../utils/storageUtil'
import {SET_HEADER_TITLE, RECEIVE_USER, RESET_USER} from './action-types'

const initHeadTitle = 'Home'
function headTitle(state=initHeadTitle, action) {
     switch (action.type) {
         case SET_HEADER_TITLE:
            return action.data
         default:
             return state
     }
}

const initUser = storageUtil.getUser()
function user(state=initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return action.data
        default:
            return state
    }
}

export default combineReducers({
    headTitle,
    user
})