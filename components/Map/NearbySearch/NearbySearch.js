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

  handleChangeSearch(searchText){
    console.log(searchText)
    this.setState({searchText});
  }

  handleSubmit(keyword){
    console.log(this.props)
    this.props.loadPOIs(this.state.searchText);
  }

  render(){
    return (
      <View style={styles.search}>
        <SearchBtn onPress={this.handleSubmit}/>
        <TextInput style={styles.textInput} placeholder="search" onChangeText={this.handleChangeSearch}/>
      </View>
    )
  }
}

export default NearbySearch;