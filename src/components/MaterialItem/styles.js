import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  title: {
    width: '33.33%',
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
  input: {
    justifyContent: 'center',
    width: '30.4%',
    height: 60,
    backgroundColor: '#F2F2F2',
    borderRadius: 30
  }
})

export default styles
