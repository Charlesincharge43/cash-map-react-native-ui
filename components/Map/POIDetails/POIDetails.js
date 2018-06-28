import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';


import styles from './styles';
import withAnimationVerticalSlide from '../../shared/hoc/withAnimationVerticalSlide';

const deviceHeight = Dimensions.get('window').height;

const POIDetailsView = (props) =>
<View style={styles.container}>
  <Text style={styles.placeHeading}>Starbucks</Text>
  <View style={{flexDirection: 'row'}}>
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.infoTextBig}>4.3</Text>
        <Text style={styles.infoTextBigDivider}>·</Text>
        <Text style={styles.infoTextBig}>4.3</Text>
        <Text style={styles.infoTextBigDivider}>·</Text>
        <Text style={styles.infoTextBig}>4.3</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.infoTextSmall}>4.3</Text>
        <Text style={styles.infoTextSmall}>4.3</Text>
        <Text style={styles.infoTextSmall}>4.3</Text>
      </View>
    </View>
  </View>
  <View style={{flexDirection: 'row'}}>
    <Text style={styles.percent}>5%</Text>
    <Image source={require('./images/freedomunlimited.png')} style={styles.cardLogo} />
  </View>
  <Image source={require('./images/starbucks.png')} style={styles.placeImage} />
</View>

const POIDetailsAnimated = withAnimationVerticalSlide(deviceHeight, deviceHeight - StyleSheet.flatten(styles.container).height, 350)(POIDetailsView);

const POIDetailsComposed = (props) => <POIDetailsAnimated isAtPositionOne={props.isHidden} {...props} />

export default POIDetailsComposed;