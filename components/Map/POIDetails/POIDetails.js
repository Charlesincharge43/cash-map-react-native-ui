import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import withAnimationVerticalSlide from '../../shared/hoc/withAnimationVerticalSlide';

const deviceHeight = Dimensions.get('window').height;

const getSymbols = (number, symbol) => {
  let symbols = '';
  roundedNumber = Math.round(number);
  while(roundedNumber > 0){
    symbols = symbols.concat(symbol)
    roundedNumber --;
  }
  return symbols;
}

// const getImageSource = (cardCode) => {
//   if (cardCode === 'DISCOVER_IT_CASH_BACK'){
//     return require('./images/discover.png');
//   } else {
//     return require('./images/freedomunlimited.png');
//   }
// }

// const IMAGES = {
//   discover: require('./images/discover.png'), // statically analyzed
//   freedomunlimited: require('./images/freedomunlimited.png'), // statically analyzed
// }

// getImage(num: number) { // dynamically invoked
//   return IMAGES['image' + num];
// }

// <Image source={IMAGES[image.key]} />



const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const POIDetailsView = (props) => {
  let placeDetail;
  let bestCard;
  let bestReward;

  if(props.selectedPOIDetailIdx){
    placeDetail = props.placesOfInterest[props.selectedPOIDetailIdx]

    let categoryKey = placeDetail.category;
    let categoryObj = props.ccHash[categoryKey];
    console.log('category obj', categoryObj);
    bestCard = categoryObj.cards[0].card;
    bestReward = categoryObj.cards[0].reward;
  }


  if(placeDetail){
    return (
      <View style={styles.container}>
        <Text style={styles.placeHeading}>{placeDetail.title}</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoTextBig}>{capitalizeFirstLetter(placeDetail.category)}</Text>
              <Text style={styles.infoTextBigDivider}>·</Text>
              <Text style={styles.infoTextBig}>0.2 mi</Text>
              <Text style={styles.infoTextBigDivider}>·</Text>
              <Text style={styles.infoTextBig}>10AM - 9PM</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.infoTextSmall}>{placeDetail.additionalDetails.vicinity}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.stars}>{placeDetail.additionalDetails.rating} {getSymbols(placeDetail.additionalDetails.rating, '★')}</Text>
              <Text style={styles.infoTextSmallDivider}>·</Text>
              <Text style={styles.infoTextSmall}>{getSymbols(placeDetail.additionalDetails.price_level, '$')}</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.percent}>Get {bestReward}% back!</Text>
          <Text style={styles.percent}>{bestCard}</Text>
          {/* <Image source={{ uri:getImageSource(bestCard) }} style={styles.cardLogo} /> */}
          {/* <Image source={require('./images/freedomunlimited.png')} style={styles.cardLogo} /> */}
        </View>
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