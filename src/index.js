import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from './store';
import Navigator from '_navigations';
console.disableYellowBox = true;
const { store, persistor } = configureStore();

const App = () => {
return <SafeAreaProvider>
       <Provider store={store}>
        <PersistGate loading={true} persistor={persistor}>
            <Navigator />
        </PersistGate>
    </Provider>
  </SafeAreaProvider>
}

export default App;