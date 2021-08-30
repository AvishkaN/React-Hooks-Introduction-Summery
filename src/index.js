import React from 'react';
import ReactDOM from 'react-dom';
import AuthConetextProvider from './Context/auth-context';

import './index.css';
import App from './App';

ReactDOM.render(<AuthConetextProvider><App /></AuthConetextProvider>, document.getElementById('root'));
