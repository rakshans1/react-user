import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

const renderApp = () => render(<App />, document.getElementById('root'));

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./App', () => {
    renderApp()
  })
}

renderApp();

registerServiceWorker();
