import React from 'react';
import {
  TextInput,
  Text,
  View } from 'react-native';

import styles from './styles'

const SideMenu = (props) => 
<View style={styles.container}>
  <TextInput style={styles.textInput} placeholder="Username" onChangeText={props.handleChangeUsername}/>
  <TextInput style={styles.textInput} secureTextEntry={true} placeholder="Password" onChangeText={props.handleChangePassword}/>
  <Text onPress={props.handleSubmit}>Sign In</Text>
  <Text style={styles.colorRed}>{props.errorMessage}</Text>
</View>

export default SideMenu;