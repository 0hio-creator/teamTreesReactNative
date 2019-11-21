import * as types from '../Constants/ActionTypes'

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
