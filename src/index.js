import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.less';
const render = Component =>
    ReactDOM.render(
            <Component />
        ,
        document.getElementById('root')
    );
render(App)
if(module.hot) {
    module.hot.accept('./App', () => {
        const NextRootContainer = require('./App').default
        render(NextRootContainer)
    })
}
// registerServiceWorker();
