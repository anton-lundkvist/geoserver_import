import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {Provider} from 'react-redux'
import store from './store/store'
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
