import { SET_IS_CHECKED, SET_IS_CHECKED_ARR } from '../actionTypes'

const initialState = {
  isChecked: []
}

<<<<<<< HEAD:src/redux/reducers/equipmentItemReduser.js
export default equipmentItemReduser = (state = initialState, action) => {
=======
export default equipmentItemReducer = (state = initialState, action) => {
>>>>>>> 12326c1ce81df15a7278f91fb3f1371652a3afb7:src/redux/reducers/equipmentItemReducer.js
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
