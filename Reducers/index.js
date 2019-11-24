import { combineReducers } from 'redux'
import * as types from '../Constants/ActionTypes'



const loginInfo = (state={}, action) => {
    switch(action.type){
        case types.SET_EMAIL:
            return {...state, email: action.email};
        case types.SET_USER_NAME:
            return {...state, userName: action.userName};
        case types.SET_PASSWORD:
            return {...state, password: action.password};
        case types.SET_PHONE_NUMBER:
            return {...state, phoneNumber: action.phoneNumber};
        case types.SET_CONFIRMATION_CODE:
            return {...state, confirmationCode: action.confirmationCode};
        case types.SET_USER_TOKEN:
            return {...state, userToken: action.userToken};
        default:
            return state;
    }
}

const treeInfo = (state={}, action) => {
    switch(action.type){
        case types.SET_TOTAL_TREES:
            return {...state, totalTrees: action.totalTrees};
        case types.SET_TOP_DONERS:
            return {...state, topDoners: action.topDoners};
        case types.SET_LATEST_DONERS:
            return {...state, latestDoners: action.latestDoners};
        case types.SET_UPDATE_TIMER:
            return {...state, updateTimer: action.updateTimer};
        default:
            return state;
    }
}

export default rootReducer= combineReducers({
    loginInfo,
    treeInfo
})
