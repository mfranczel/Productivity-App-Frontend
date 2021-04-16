import React, { useEffect } from 'react';
import { Provider} from 'react-redux'
import getStore from './store'
import Home from './Home';
import {registerRootComponent} from 'expo'

const { store } = getStore()

const App = () => {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}

registerRootComponent(App)

export default App
