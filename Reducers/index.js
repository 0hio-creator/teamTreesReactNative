import { combineReducers } from 'redux'
import * as types from '../Constants/ActionTypes'



const loginInfo = (state={}, action) => {
    return state;
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
