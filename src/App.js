import React, { useEffect } from 'react';
import { Provider} from 'react-redux'
import getStore from './store'
import Home from './Home';
import {registerRootComponent} from 'expo'
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const { store } = getStore()

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Home />
      </SafeAreaProvider>
    </Provider>
  );
}

registerRootComponent(App)
export default App
