import React, { Component } from 'react';
import { View, ActivityIndicator, Alert, Image } from 'react-native';
import { connect } from 'react-redux';

import styles from './styles';
import Hamburger from './buttons/Hamburger';
import CenterBtn from './buttons/CenterBtn';
import RedoSearchBtn from './buttons/RedoSearchBtn';
import NearbySearch from './NearbySearch/NearbySearch';

import POIDetails from './POIDetails/POIDetails';

import withGeolocation from '../Map/hoc/withGeolocation';
import MapViewContainer from './MapView/MapViewContainer';

import { invertCCHash, allCreditCards } from '../../cashMapTempStore/cashmapStore';
import { setPOIs, addPOIs, clearPOIs, setPOIsByTypes } from '../../redux/placesOfInterest';
import { setCategoryHash } from '../../redux/ccHash';

const ALERT = 'Warning';
const ERROR_MESSAGE = 'Unable to fetch places of interest from data source.  Please try again later.';

/* TODO: many aspects of this component are not optimal due to some limitations and/or bugs related to either react native maps
or ios simulator.

When the relevant enhancements/fixes have been implemented, the sub optimal code should be refactored.
Scroll to `onRegionChange` method for specific notes.  Also see `MapViewContainer.js`

TODO: A lot of map related state is split arbitrarily between this MapViewContainer and the MapContainer.
These two containers and the withGeolocation hoc all are badly in in need of refactoring.
*/

class StatefulMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
      selectedLatitude: 0,
      selectedLongitude: 0,
      trackCurrentPosition: true,
      isRedoSearchHidden: true,
      isPOIDetailsHidden: true,
      isLoading: false,
      selectedPOIDetailIdx: null,

      /* temporary state... this should all be on redux eventually.  Hardcoded for now */
      userCreditCards: ['CHASE_FREEDOM', 'BANK_OF_AMERICA_CASH_REWARDS', 'DISCOVER_IT_CASH_BACK'],
      userSelectedCreditCards: ['CHASE_FREEDOM', 'BANK_OF_AMERICA_CASH_REWARDS', 'DISCOVER_IT_CASH_BACK'],
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
    this.centerMapToCurrentPosition = this.centerMapToCurrentPosition.bind(this);
    this.onMapReady = this.onMapReady.bind(this);
    this.loadPOIs = this.loadPOIs.bind(this);
    this.showPOIDetails = this.showPOIDetails.bind(this);
    this.hidePOIDetails = this.hidePOIDetails.bind(this);
  }

  loadPOIs() {
    this.setState({isLoading: true})
    const specificCCHash = {};
    this.state.userSelectedCreditCards.forEach(card => {
      specificCCHash[card] = allCreditCards[card];
    })
    const categoryHash = invertCCHash(specificCCHash);
    delete categoryHash.default; // FOR NOW WE HAVE NOT FIGURED OUT THE DEFAULT THING
    this.props.setCategoryHash(categoryHash); // set category hash to global
    const types = Object.keys(categoryHash);
    // console.log(types);
    const regionParams = this.state.trackCurrentPosition ? this.getCurrentRegion() : this.getSelectedRegion();
    const queryParams = Object.assign(regionParams, { types });
    return this.props.setPOIsByTypes(queryParams)
      .then(() => this.setState({isRedoSearchHidden: true, isLoading: false }))
      .catch((err) => {
        console.error(err)
        this.setState({isRedoSearchHidden: false, isLoading: false });
        Alert.alert(
          ALERT,
          ERROR_MESSAGE,
          [{text: 'OK'}])
      });
  }

  showPOIDetails(selectedPOIDetailIdx) {
    console.log('hidden? ', this.state.isPOIDetailsHidden)
    if (!this.state.isPOIDetailsHidden) {
      console.log('resetting POI Detail')
      this.setState({
        isPOIDetailsHidden: true
      })
      setTimeout(() => {
        this.setState({
          isPOIDetailsHidden: false,
          selectedPOIDetailIdx: selectedPOIDetailIdx,
        })
      }, 500)
    } else {
      this.setState({
        isPOIDetailsHidden: false,
        selectedPOIDetailIdx: selectedPOIDetailIdx,
      })
    }
  }

  hidePOIDetails() {
    this.setState({
      isPOIDetailsHidden: true,
      selectedPOIDetailIdx: null,
    })
  }

  onMapReady() {
    this.props.updateCurrentPosition()
      .then(this.loadPOIs)
  }

  centerMapToCurrentPosition() {
    this.setState({
      trackCurrentPosition: true,
    });
    this.props.updateCurrentPosition();
  }

  onRegionChange() {
    /* setting of `trackCurrentPosition` to false is coupled with the `onRegionChange` hook here, in order to allow
    manual user interaction to disable automatic location updating from the `withGeolocation` props.  This
    is suboptimal as `onRegionChange` also gets triggered when the application does any sort of map scrolling animation.
    
    Unfortunately, react native maps does NOT provide a way to distinguish region change from user vs from the application.
    Consequently, map location updating from the application have to avoid "animations" to not trigger this hook.
    (See MapViewContainer.js comments)
    (See related github issues thread: https://github.com/react-community/react-native-maps/issues/1620)

    Because there is an automatic animation movement that always triggers after component mounting/onMapReady, but before
    `withGeolocation` has updated props, this `if` conditional is required to avoid `trackCurrentPosition` from being set to
    false prematurely in the beginning before the user has had a chance to interact with the map
    */

    if (this.props.geolocation && this.props.geolocation.initialized) {
      this.setState({
        trackCurrentPosition: false,
        isRedoSearchHidden: false,
      })
    }
  }

  onRegionChangeComplete({ latitude, longitude, latitudeDelta, longitudeDelta }) {
    this.setState({
      latitudeDelta,
      longitudeDelta,
      selectedLatitude: latitude,
      selectedLongitude: longitude,
    })
  }

  getCurrentLatitude() {
    return this.props.geolocation.currentLatitude;
  }

  getCurrentLongitude() {
    return this.props.geolocation.currentLongitude;
  }

  getCurrentRegion() {
    return {
      latitude: this.getCurrentLatitude(),
      longitude: this.getCurrentLongitude(),
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta,
    };
  }

  getSelectedRegion() {
    return {
      latitude: this.state.selectedLatitude,
      longitude: this.state.selectedLongitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta,
    };
  }

  componentWillUnmount(){
    this.props.clearPOIs();
  }

  render() {
    const { openDrawer } = this.props.navigation;
    return (
      <View style={styles.mapContainer}>
        <Hamburger style={styles.topLeft} onPress={openDrawer} />
        <NearbySearch />
        <MapViewContainer
          trackCurrentPosition={this.state.trackCurrentPosition}
          region={this.getCurrentRegion()}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          onMapReady={this.onMapReady}
          showPOIDetails={ this.showPOIDetails }
          hidePOIDetails={ this.hidePOIDetails } />
        <Image style={{height: 170, width:100, top: 80, left: 10}} source={require('./creditcardimagelist.png')} />
        <CenterBtn style={styles.bottomRight} onPress={this.centerMapToCurrentPosition} />

        <RedoSearchBtn isHidden={this.state.isRedoSearchHidden || !this.state.isPOIDetailsHidden } style={styles.bottomRightLower} onPress={this.loadPOIs}/>

        <POIDetails isHidden={this.state.isPOIDetailsHidden } selectedPOIDetailIdx={this.state.selectedPOIDetailIdx} />

        <ActivityIndicator style={styles.center} size='large' color='#0000ff' animating={this.state.isLoading}/>
      </View>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = { setPOIs, addPOIs, clearPOIs, setPOIsByTypes, setCategoryHash };

export default connect(mapStateToProps, mapDispatchToProps)(withGeolocation(StatefulMap));