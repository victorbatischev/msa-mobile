import {
  SET_ACTIVE_BARCODE,
  SET_ACTIVE_INDEX,
  SET_ACTIVE_ORDER,
  SET_BARCODE,
  SET_BOUNDS,
  SET_CONFIRMATION,
  SET_EQUIPMENT_ARR,
  SET_EQUIPMENT_VISIBLE,
  SET_FINISH_ORDER_PARAMS,
  SET_HAS_PERMISSION,
  SET_IS_CHECKED,
  SET_IS_CHECKED_ARR,
  SET_IS_MODAL_WORK_SHIFT_VISIBLE,
  SET_IS_USER_MENU_MODAL,
  SET_ITEM,
  SET_MAPS_ARR,
  SET_MATERIALS_ARR,
  SET_MATERIALS_CONDITION,
  SET_MATERIALS_VALUE,
  SET_MESSAGES,
  SET_MODAL_VISIBLE,
  SET_MODAL_VISIBLE_TECH_MAPS,
  SET_ORDERS,
  SET_ORDER_CANCEL_MODAL_VISIBLE,
  SET_ORDER_STARTED,
  SET_PLAY_SOUND,
  SET_PRIVIOUS_OPERATION,
  SET_SCANNED,
  SET_SELECTED_ITEMS_CHECKED,
  SET_SELECTED_ITEMS_UNCHECKED,
  SET_SHOW_MATERIALS_COMPONENT,
  SET_SOUND,
  SET_USER
} from './actionTypes'

// For mainReduser ///////////////////////////////////////////////////////////////////////

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

export const setEquipmentArr = (data) => {
  return {
    type: SET_EQUIPMENT_ARR,
    data
  }
}

export const setIsEquipmentVisible = (data) => {
  return {
    type: SET_EQUIPMENT_VISIBLE,
    data
  }
}

export const setSelectedItemsCheced = (id) => {
  return {
    type: SET_SELECTED_ITEMS_CHECKED,
    id
  }
}

export const setSelectedItemsUnCheced = (id) => {
  return {
    type: SET_SELECTED_ITEMS_UNCHECKED,
    id
  }
}

export const setFinishOrderParams = (data) => {
  return {
    type: SET_FINISH_ORDER_PARAMS,
    data
  }
}

// For headerReduser ///////////////////////////////////////////////////////////////////////

export const setIsModalWorkShiftVisible = (isVisible) => {
  return {
    type: SET_IS_MODAL_WORK_SHIFT_VISIBLE,
    data: isVisible
  }
}

export const setIsUserMenuModal = (isModal) => {
  return {
    type: SET_IS_USER_MENU_MODAL,
    data: isModal
  }
}

// For messagesReduser ///////////////////////////////////////////////////////////////////////

export const setMessages = (messages) => {
  return {
    type: SET_MESSAGES,
    data: messages
  }
}

// For activeOrderReduser ///////////////////////////////////////////////////////////////////////

export const setSound = (sound) => {
  return {
    type: SET_SOUND,
    data: sound
  }
}

// For techMapsReduser ///////////////////////////////////////////////////////////////////////

export const setMapsArr = (maps) => {
  return {
    type: SET_MAPS_ARR,
    data: maps
  }
}

export const setModalVisibleTechMaps = (isVisible) => {
  return {
    type: SET_MODAL_VISIBLE_TECH_MAPS,
    data: isVisible
  }
}

export const setItem = (item) => {
  return {
    type: SET_ITEM,
    data: item
  }
}

// For barCodeReduser ///////////////////////////////////////////////////////////////////////

export const setHasPermission = (data) => {
  return {
    type: SET_HAS_PERMISSION,
    data
  }
}

export const setScanned = (isScanned) => {
  return {
    type: SET_SCANNED,
    data: isScanned
  }
}

export const setBarcode = (data) => {
  return {
    type: SET_BARCODE,
    data
  }
}

export const setBounds = (bounds) => {
  return {
    type: SET_BOUNDS,
    data: bounds
  }
}

// For equipmentItemReduser ///////////////////////////////////////////////////////////////////////

export const setIsCheckedArr = () => {
  return {
    type: SET_IS_CHECKED_ARR
  }
}

export const setIsChecked = (index) => {
  return {
    type: SET_IS_CHECKED,
    index
  }
}
