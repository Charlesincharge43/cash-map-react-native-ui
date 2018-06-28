import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';


import styles from './styles';
import withAnimationVerticalSlide from '../../shared/hoc/withAnimationVerticalSlide';

const deviceHeight = Dimensions.get('window').height;

const POIDetailsView = (props) => {
  let placeDetail;
  if(props.selectedPOIDetailIdx){
    placeDetail = props.placesOfInterest[props.selectedPOIDetailIdx]
  }
  if(placeDetail){
    return (
      //props.placesOfInterest = places on map
      //click on marker - get selected index selectedPOIDetailIdx
      <View style={styles.container}>
        <Text style={styles.placeHeading}>{placeDetail.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoTextBig}>{placeDetail.category}</Text>
              <Text style={styles.infoTextBigDivider}>·</Text>
              <Text style={styles.infoTextBig}>0.2 mi</Text>
              <Text style={styles.infoTextBigDivider}>·</Text>
              <Text style={styles.infoTextBig}>10AM - 9PM</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoTextSmall}>{placeDetail.additionalDetails.rating} ★★★★</Text>
              <Text style={styles.infoTextSmallDivider}>·</Text>
              <Text style={styles.infoTextSmall}>$$</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.percent}>5%</Text>
          <Image source={require('./images/freedomunlimited.png')} style={styles.cardLogo} />
        </View>
        <Image source={require('./images/starbucks.png')} style={styles.placeImage} />
      </View>
    )
  } else {
    return (
      <View />
    )
  }
}

const POIDetailsAnimated = withAnimationVerticalSlide(deviceHeight, deviceHeight - StyleSheet.flatten(styles.container).height, 350)(POIDetailsView);

const POIDetailsComposed = (props) => <POIDetailsAnimated isAtPositionOne={props.isHidden} {...props} />
const mapStateToProps = ({ placesOfInterest, ccHash }) => ({ placesOfInterest, ccHash });

export default connect(mapStateToProps)(POIDetailsComposed);