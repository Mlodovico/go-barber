import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer} from '@react-navigation/native'
import { View, StatusBar } from 'react-native';

import AppProvider from './hook';

import Routes from './routes/index';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="dark-content" backgroundColor="#ff9000" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </ NavigationContainer>

);

export default App;
