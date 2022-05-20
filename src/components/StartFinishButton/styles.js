import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: 160
  },
  okCloseButtonsContainer: {
    flexDirection: 'row',
    flex: 1
  },
  buttonContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center'
  },
  okIcon: {
    width: 36,
    height: 36,
    marginBottom: 10
  },
  closeIcon: {
    width: 32,
    height: 32
  },
  tytleText: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: '#fff'
  }
})

export default styles
