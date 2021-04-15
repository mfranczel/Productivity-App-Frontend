import React, { useEffect } from 'react';
import { Provider} from 'react-redux'
import getStore from './store'
import Home from './Home';

const { store } = getStore()

const App = () => {

  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}


export default App
