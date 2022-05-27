import { SET_IS_EQUIPMENT_EMPTY } from '../actionTypes'

const initialState = {
  isEquiomentEmpty: false
}

export default startFinishButtonReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_EQUIPMENT_EMPTY:
      return { ...state, isEquiomentEmpty: action.data }
    default:
      return state
  }
}
