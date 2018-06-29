import React from 'react';
import {
  Animated,
  TextInput,
  Text,
  Image,
  View, 
  TouchableHighlight } from 'react-native';

import styles from './styles'



const SideMenu = (props) => 
<View style={styles.container}>
  <Image source={require('./Logotransparent.png')} style={styles.logo} />
  <Image source={require('./cashmaptext.png')} style={styles.logotext} />
  <TextInput style={styles.textInput} placeholder="Username" onChangeText={props.handleChangeUsername}/>
  <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password" onChangeText={props.handleChangePassword}/>
  <Text style={styles.colorRed}>{props.errorMessage}</Text>
  <TouchableHighlight style={styles.button} onPress={props.handleSubmit}><Text style={styles.buttonText}>Sign In</Text></TouchableHighlight>
  <TouchableHighlight style={styles.button}><Text style={styles.buttonText}>Create Account</Text></TouchableHighlight>
</View>

export default SideMenu;