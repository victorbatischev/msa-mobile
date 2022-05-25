import {
  SET_ACTIVE_BARCODE,
  SET_ACTIVE_INDEX,
  SET_ACTIVE_ORDER,
  SET_MODAL_VISIBLE,
  SET_ORDERS,
  SET_ORDER_STARTED,
  SET_PLAY_SOUND,
  SET_USER
} from './actionTypes'

export const setUser = (tempUser) => {
  return {
    type: SET_USER,
    data: tempUser
  }
}

export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    data: orders
  }
}

export const setIsPlaySound = (isPlaySound) => {
  return {
    type: SET_PLAY_SOUND,
    data: isPlaySound
  }
}

export const setActiveOrder = (activeOrder) => {
  return {
    type: SET_ACTIVE_ORDER,
    data: activeOrder
  }
}

export const setActiveIndex = (index) => {
  return {
    type: SET_ACTIVE_INDEX,
    data: index
  }
}

export const setActiveBarCode = (isActive) => {
  return {
    type: SET_ACTIVE_BARCODE,
    data: isActive
  }
}

export const setOrderStarted = (isOrderStarded) => {
  return {
    type: SET_ORDER_STARTED,
    data: isOrderStarded
  }
}

export const setModalVisible = (isVisible) => {
  return {
    type: SET_MODAL_VISIBLE,
    data: isVisible
  }
}
