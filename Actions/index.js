import * as types from '../Constants/ActionTypes'

// TEAM TREE ACTIONS
export const setTotalTrees = totalTrees => ({
    type: types.SET_TOTAL_TREES,
    totalTrees: totalTrees
})

export const setTopDoners = topDoners => ({
    type: types.SET_TOP_DONERS,
    topDoners: topDoners
})

export const setLatestDoners = latestDoners => ({
    type: types.SET_LATEST_DONERS,
    latestDoners: latestDoners
})

export const setUpdateTimer = updateTimer => ({
    type: types.SET_UPDATE_TIMER,
    updateTimer: updateTimer
})


// lOGIN ACTIONS
export const setEmail = email => ({
    type:types.SET_EMAIL,
    email:email
})

export const setUserName = userName => ({
    type:types.SET_USER_NAME,
    userName:userName
})

export const setPassword = password => ({
    type:types.SET_PASSWORD,
    password:password
})

export const setPhoneNumber = phoneNumber => ({
    type:types.SET_PHONE_NUMBER,
    phoneNumber:phoneNumber
})

export const setConfirmationCode = confirmationCode => ({
    type:types.SET_CONFIRMATION_CODE,
    confirmationCode:confirmationCode
})

export const setUserToken = userToken => ({
    type:types.SET_USER_TOKEN,
    userToken:userToken
})
