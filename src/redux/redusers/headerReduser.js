import {
  SET_IS_MODAL_WORK_SHIFT_VISIBLE,
  SET_IS_USER_MENU_MODAL
} from '../actionTypes'

const initialState = {
  isModalWorkShiftVisible: false,
  isUserMenuModal: false
}

export default headerReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_MODAL_WORK_SHIFT_VISIBLE:
      return { ...state, isModalWorkShiftVisible: action.data }
    case SET_IS_USER_MENU_MODAL:
      return { ...state, isUserMenuModal: action.data }
    default:
      return state
  }
}
