import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { PermissionsProvider } from "./permissions"

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PermissionsProvider>
        <App />
      </PermissionsProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
