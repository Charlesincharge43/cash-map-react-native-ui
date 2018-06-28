import React from 'react';
import {
  TextInput,
  Text,
  Image,
  View, 
  TouchableHighlight } from 'react-native';

import btnFactory from '../../shared/hoc/btnFactory';
import styles from './styles';

const SearchBtnView = () =>
  <Image source={require('./img/search.png')} style= {styles.searchBtn}/>

const SearchBtn = btnFactory(SearchBtnView);

class NearbySearch extends React.Component {
  constructor(props){
    super(props)
    this.state = { searchText: '' };
    this.handleChangeSearch = this.handleChangeSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeSearch(){
    console.log('here')
  }

  handleSubmit(){
    console.log('submit')
  }

  render(){
    return (
      <View style={styles.search}>
        <SearchBtn />
        <TextInput style={styles.textInput} placeholder="search" onChangeText={this.handleChangeSearch}/>
      </View>
    )
  }
}

export default NearbySearch;