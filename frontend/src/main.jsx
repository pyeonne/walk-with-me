import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './reset.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './context';
import { CookiesProvider } from 'react-cookie';

ReactDOM.render(
  <CookiesProvider>
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);
