import React from 'react';
import {DrawerItems} from 'react-navigation';
import {Text, View, Image} from 'react-native';

import styles from './styles'

const SideMenu = (props) => 
<View style={styles.sideMenu}>
  <View style={{height: 50}}>
    <Text>
    </Text>
  </View>
  <View>
    <Image source={require('./savings.png')} style={styles.logo} /> 
    <Image source={require('./settings.png')} style={styles.logo} /> 
    <Image source={require('./logout.png')} style={styles.logo} /> 
    <Image source={require('./aboutus.png')} style={styles.logo} /> 
    <Image source={require('./contactus.png')} style={styles.logo} /> 
  </View>
</View>

export default SideMenu;