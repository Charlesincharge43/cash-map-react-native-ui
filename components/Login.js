import React, { Component } from 'react';
import {
  TextInput,
  Text,
  View } from 'react-native';
import { connect } from 'react-redux';

import styles from '../styles';
import { signin } from '../redux/auth';


class Login extends Component {
  constructor(props){
    super(props)
    this.state = { username: '', password: '', errorMessage: ''};
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(username){
    // console.log('username : ' + username);
    this.setState({username});
  }

  handleChangePassword(password){
    // console.log('password : ' + password);
    this.setState({password});
  }

  handleSubmit(){
    // console.log('logging in with following credentials: ');
    // console.log(this.state);

    const { navigate } = this.props.navigation;
    const credentials = {username: this.state.username, password: this.state.password};
    this.props.signin(credentials)
      .then(() => navigate('Main'))
      .catch(err => {
        console.log('error from server: ' + err);
        if (err.response && err.response.status === 401) {
          this.setState({errorMessage: 'The email address or password you entered is incorrect.'});
        } else {
          this.setState({errorMessage: 'The system could not process your request.  Please try again'});
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>USERNAME</Text>
        <TextInput style={styles.textInput} onChangeText={this.handleChangeUsername}/>
        <Text>PASSWORD</Text>
        <TextInput style={styles.textInput} secureTextEntry={true} onChangeText={this.handleChangePassword}/>
        <Text onPress={this.handleSubmit}>SIGN IN</Text>
        <Text style={styles.colorRed}>{this.state.errorMessage}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = { signin };

const ConnectedLogin = connect(null, mapDispatchToProps)(Login);
export default ConnectedLogin;