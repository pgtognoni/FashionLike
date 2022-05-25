import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { UserProvider } from './component/UserContext';

ReactDOM.render(
    <UserProvider>
      <App />
    </UserProvider>,
  document.getElementById('root')
);
