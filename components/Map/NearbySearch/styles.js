
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  search: {
    zIndex: 1,
    width: 200,
    height: 25,
    left: 70,
    top: 46,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 25, 
    backgroundColor: 'white',
    height: 40,
    borderColor: '#DDD',
    marginTop: 10,
    borderWidth: 2,
    width: 230,
    left: -15,
  },
  searchBtn: {
    width: 58,
    height: 58,
    top: 2,
    left: -10,
    resizeMode: 'stretch'
  }
})

export default styles;