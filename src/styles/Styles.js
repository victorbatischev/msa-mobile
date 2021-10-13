import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  authInput: {
    width: '100%',
    backgroundColor: 'transparent',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginTop: 10
  },
  authButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 10,
    marginTop: 30
  },
  authText: {
    fontFamily: 'Montserrat',
    fontSize: 24,
    color: '#fff'
  },
  authError: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#E31E24',
    padding: 20,
    width: '100%'
  },
  authContainer: {
    width: '100%',
    padding: 60,
    display: 'flex',
    alignItems: 'center',
    paddingTop: -50
  }
})

export default styles
