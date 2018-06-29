import React from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#117ACA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 20, 
    backgroundColor: 'white',
    height: 40,
    borderColor: '#DDD',
    marginTop: 10,
    borderWidth: 2,
    width: 300,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#33BBFF',
    height: 30,
    width: 300,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  logo: {
    width: 170,
    height: 170,
    top: 110,
  },
  logotext: {
    width: 170,
    height: 170,
    top: 75,
  },
  colorRed: { color: 'red'},
  colorGreen: { color: 'green'},
});

export default styles;