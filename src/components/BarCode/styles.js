import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: '#0000007f',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  closeButonLine: {
    width: 30,
    height: 2,
    backgroundColor: '#fff'
  },
  closeButonUpLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1 }]
  },
  closeButonDownLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1 }]
  },
  bounds: {
    position: 'absolute',
    borderWidth: 4
  },
  buttons: {
    width: 24,
    height: 24
  },
  barcodeText: {
    fontFamily: 'Roboto',
    color: '#fff',
    fontSize: 10
  },
  orderNameText: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#fff'
  }
})

export default styles
