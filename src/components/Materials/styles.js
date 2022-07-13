import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 17,
    paddingVertical: 19,
    borderBottomWidth: 3,
    borderBottomColor: '#00000029',
    backgroundColor: '#fff',
    elevation: 6
  },
  headerText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },
  container: {
    backgroundColor: '#fff',
    padding: 10
  },
  okButton: {
    marginTop: 50,
    alignSelf: 'center',
    width: 200,
    height: 66,
    backgroundColor: '#009C6D',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Roboto'
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: 50,
    borderColor: '#707070',
    borderWidth: 1,
    padding: 10,
    width: 150
  },
  cancelButtonText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: '#6C6F72'
  },
  cross: {
    marginRight: 10
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: '#6C6F72'
  },
  upLine: {
    transform: [{ rotate: '45deg' }, { translateY: 1.5 }]
  },
  downLine: {
    transform: [{ rotate: '-45deg' }, { translateY: -1.5 }]
  }
})

export default styles
