import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals.js';
import { Auth0Provider } from "@auth0/auth0-react";
import config from './auth_config.json'

const result = dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={result.domain}
    clientId={result.clientId}
    redirectUri={window.location.origin}
    user
  >
    <App/>
  </Auth0Provider>

  // </React.StrictMode>,
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
