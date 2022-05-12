import { StyleSheet } from 'react-native'
import { windowWidth } from '../../Constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000d9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBlock: {
    width: windowWidth > 480 ? '66%' : '90%',
    height: windowWidth * (windowWidth > 480 ? 0.38 : 1.3),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoBlockText: {
    fontFamily: 'Montserrat',
    fontSize: windowWidth > 480 ? 30 : 26,
    lineHeight: 37
  },
  infoBlockTextId: {
    marginTop: 10,
    fontFamily: 'Roboto',
    fontSize: 13,
    color: '#8F8F8F'
  },
  button: {
    marginTop: 30,
    width: 300,
    height: 80,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: 'Montserrat',
    color: '#fff',
    fontSize: 30
  }
})

export default styles
