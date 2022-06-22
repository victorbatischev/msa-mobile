import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  title: {
    width: '45%',
    fontSize: 14,
    fontFamily: 'Roboto'
  },
  sign: {
    width: 42,
    height: 42,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 21
  },
  signText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#000'
  },
  input: {
    justifyContent: 'center',
    width: '30.4%',
    height: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 30,
    fontSize: 18,
    fontFamily: 'Montserrat',
    color: '#000'
  }
})

export default styles
