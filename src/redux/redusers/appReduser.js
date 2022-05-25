const initialState = {
  app: '0'
}

export default appReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'INCR':
      return { app: state.app + 1 }
    default:
      return state
  }
}
