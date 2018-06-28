import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';
import btnFactory from '../../shared/hoc/btnFactory';

const HamburgerView = () =>
  /*<View style={styles.hamburger}>
    <View style={styles.hamburgerLine} />
    <View style={styles.hamburgerLine}/>
    <View style={styles.hamburgerLine}/>
  </View>*/
  <Image source={require('./MenuButton.png')} style={styles.hamburgerBtnImage} />

const Hamburger = btnFactory(HamburgerView);

export default Hamburger;