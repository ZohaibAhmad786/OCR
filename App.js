import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Start from './components/Start'
import Final from './components/Final'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Start/>
      </View>
    );
  }
}
