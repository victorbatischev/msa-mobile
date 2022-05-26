import { combineReducers } from 'redux'
import activeOrderReduser from './redusers/activeOrderReduser'
import barCodeReduser from './redusers/barCodeReduser'
import headerReduser from './redusers/headerReduser'
import mainReduser from './redusers/mainReduser'
import messagesReduser from './redusers/messagesReduser'
import techMapsReduser from './redusers/techMapsReduser'
import equipmentItemRduser from './redusers/equipmentItemRduser'
import newMessageItemReduser from './redusers/newMessageItemReduser'
import orderReduser from './redusers/orderReduser'

export default rootReduser = combineReducers({
  main: mainReduser,
  header: headerReduser,
  messages: messagesReduser,
  activeOrder: activeOrderReduser,
  TechMaps: techMapsReduser,
  barCode: barCodeReduser,
  equipmentItem: equipmentItemRduser,
  newMessageItem: newMessageItemReduser,
  order: orderReduser
})
