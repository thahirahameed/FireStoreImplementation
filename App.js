import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {FireStoreActions} from './screens';

function App() {
  return (
    <SafeAreaView>
      <ScrollView>
        <FireStoreActions />
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
