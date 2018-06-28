
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  search: {
    zIndex: 1,
    width: 125,
    height: 50,
    left: 120,
    top: 50,
    flexDirection: 'row'
  },
  textInput: {
    fontSize: 20, 
    backgroundColor: 'white',
    height: 40,
    borderColor: '#DDD',
    marginTop: 10,
    borderWidth: 2,
    width: 200,
  },
  searchBtn: {
    width: 40,
    height: 40,
    resizeMode: 'stretch'
  }
})

export default styles;