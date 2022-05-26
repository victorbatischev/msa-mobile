import { combineReducers } from 'redux'
import activeOrderReduser from './redusers/activeOrderReduser'
import headerReduser from './redusers/headerReduser'
import mainReduser from './redusers/mainReduser'
import messagesReduser from './redusers/messagesReduser'
import techMapsReduser from './redusers/techMapsReduser'

export default rootReduser = combineReducers({
  main: mainReduser,
  header: headerReduser,
  messages: messagesReduser,
  activeOrder: activeOrderReduser,
  TechMaps: techMapsReduser
})
