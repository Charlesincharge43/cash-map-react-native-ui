import React from 'react';
import { Image } from 'react-native';

import styles from './styles';
import btnFactory from '../../shared/hoc/btnFactory';

const CenterBtnView = () =>
  <Image source={require('./Center_Icon.png')} style={styles.centerBtnImage} />

const CenterBtn = btnFactory(CenterBtnView);

export default CenterBtn;