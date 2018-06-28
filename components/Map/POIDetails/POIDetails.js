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

const getCardName = (cardCode) => {
  if (cardCode === 'DISCOVER_IT_CASH_BACK'){
    return 'DISCOVERit Cash Back'
  } else  if (cardCode === 'CHASE_FREEDOM'){
    return 'Chase Freedom'
  } else  if (cardCode === 'BANK_OF_AMERICA_CASH_REWARDS'){
    return 'Bank of America Cash Rewards'
  } else  if (cardCode === 'CITI_DOUBLE_CASH_CARD'){
    return 'CITI Double Cash'
  } else  if (cardCode === 'BARCLAY_UBER_VISA_CARD'){
    return 'Barclay Uber Visa'
  } else  if (cardCode === 'US_BANK_CASH_PLUS'){
    return 'US Bank Cash PLus'
  } else  if (cardCode === 'AMERICAN_EXPRESS_BLUE_CASH_PREFERRED'){
    return 'American Express Blue Cash Preferred'
  }
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);


const POIDetailsView = (props) => {
  let placeDetail;
  let bestCard;
  let bestReward;
  let otherCardView = [];

  if(props.selectedPOIDetailIdx){
    placeDetail = props.placesOfInterest[props.selectedPOIDetailIdx]

    let categoryKey = placeDetail.category;
    let categoryObj = props.ccHash[categoryKey];
    bestCard = categoryObj.cards[0].card;
    bestReward = categoryObj.cards[0].reward;

    otherCards = categoryObj.cards.slice(1);
    for(let i=0; i<otherCards.length; i++){
      otherCardView.push(<Text key={i} style={styles.infoTextSmall}>Get {otherCards[i].reward}% back with {getCardName(otherCards[i].card)}!</Text>)
    }
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
            <View style={{flexDirection: 'row', paddingBottom: 1}}>
              <Text style={styles.stars}>{placeDetail.additionalDetails.rating} {getSymbols(placeDetail.additionalDetails.rating, '★')}</Text>
              <Text style={styles.infoTextSmallDivider}>·</Text>
              <Text style={styles.infoTextSmall}>{getSymbols(placeDetail.additionalDetails.price_level, '$')}</Text>
            </View>
          </View>
        </View>
        <Text style={styles.percent}>Get {bestReward}% back with {getCardName(bestCard)}!</Text>
        { otherCardView }
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