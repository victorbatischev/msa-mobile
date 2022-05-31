import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  operationText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#8F8F8F'
  },
  descriptionNameText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: windowWidth > 480 ? '#fff' : '#000'
  }
})

export default styles
