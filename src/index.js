import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react' //used for login Auth used in nav.js
import firebase from './firebase'
import './index.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Auth0Provider
    domain="dev-4o5ju5lcr58optt0.us.auth0.com"
    clientId="wx5yOY2SA9as1XEbs0molzneR2UY4DmM"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);

