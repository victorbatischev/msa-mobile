import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 17,
    paddingTop: 30,
    paddingBottom: 19,
    borderBottomWidth: 4,
    borderBottomColor: '#00000020'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 17
  },
  okButton: {
    marginTop: 50,
    alignSelf: 'center',
    width: 200,
    height: 66,
    backgroundColor: '#009C6D',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto'
  }
})

export default styles
