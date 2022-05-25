import {
  SET_ACTIVE_BARCODE,
  SET_ACTIVE_INDEX,
  SET_ACTIVE_ORDER,
  SET_CONFIRMATION,
  SET_MATERIALS_ARR,
  SET_MATERIALS_CONDITION,
  SET_MATERIALS_VALUE,
  SET_MODAL_VISIBLE,
  SET_ORDERS,
  SET_ORDER_CANCEL_MODAL_VISIBLE,
  SET_ORDER_STARTED,
  SET_PLAY_SOUND,
  SET_PRIVIOUS_OPERATION,
  SET_SHOW_MATERIALS_COMPONENT,
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

export const setOrderCancelModalVisible = (isVisible) => {
  return {
    type: SET_ORDER_CANCEL_MODAL_VISIBLE,
    data: isVisible
  }
}

export const setPreviousOperation = (previousOperationArr) => {
  return {
    type: SET_PRIVIOUS_OPERATION,
    data: previousOperationArr
  }
}

export const setIsConfirmation = (isConfirmation) => {
  return {
    type: SET_CONFIRMATION,
    data: isConfirmation
  }
}

export const setMaterialsArr = (materialsArr) => {
  return {
    type: SET_MATERIALS_ARR,
    data: materialsArr
  }
}

export const setMaterialsCondition = (materials, index) => {
  return {
    type: SET_MATERIALS_CONDITION,
    materials,
    index
  }
}

export const setMaterialsValue = (data, materials, index) => {
  return {
    type: SET_MATERIALS_VALUE,
    data,
    materials,
    index
  }
}

export const setShowMaterialsComponent = (data) => {
  return {
    type: SET_SHOW_MATERIALS_COMPONENT,
    data
  }
}
