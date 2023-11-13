import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {LoginScreen} from './screens';

function App() {
  return (
    <View>
      <Text style={{marginTop: 30}}>Firebase Authentication</Text>
      <LoginScreen />
    </View>
  );
}

export default App;
