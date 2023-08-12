
import ReactDOM from 'react-dom/client';

import { PersistGate } from 'redux-persist/integration/react'
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { persistor, store } from "./redux/store/index.js";
import AppRoutes from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PersistGate>
  </ReduxProvider>
)