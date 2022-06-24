import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
    backgroundColor: '#fff'
  },
  mapName: {
    alignSelf: 'center',
    marginTop: 5
  },
  closeModalButton: {
    width: 40,
    height: 40,
    backgroundColor: '#8F8F8F',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginRight: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeModalButtonLine: {
    width: 25,
    height: 2,
    backgroundColor: '#fff'
  },
  closeModalButtonLeftLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1 }]
  },
  closeModalButtonRightLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1 }]
  }
})

export default styles
