import { SET_IS_CHECKED, SET_IS_CHECKED_ARR } from '../actionTypes'

const initialState = {
  isChecked: []
}

export default equipmentItemReduser = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_CHECKED_ARR:
      let arr = state.isChecked
      arr.push(false)
      return { ...state, isChecked: arr }
    case SET_IS_CHECKED:
      let copyIsChecked = Object.assign([], state.isChecked)
      copyIsChecked[action.index] = !state.isChecked[action.index]
      return { ...state, isChecked: copyIsChecked }
    default:
      return state
  }
}
