import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app.tsx';
import './index.css';
import { store } from './app/redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
