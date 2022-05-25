import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReduser from './rootReduser'

export default store = createStore(rootReduser, compose(applyMiddleware(thunk)))
