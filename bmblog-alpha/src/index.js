import "./globals";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppContainer';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import vhFix from './plugins/vhFix';

import jquery from 'jquery';

window.jQuery = jquery;
window.jquery = jquery;
window.$ = jquery;

ReactDOM.render((
    <Provider store={ store }>
        <App />
    </Provider>
), document.getElementById('root'));

serviceWorker.unregister();

vhFix();
