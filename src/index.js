import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// redux
import {Provider} from 'react-redux';
import {createStore} from 'redux';
// style
import './index.css';

const initialStore = () => {
    return {mode: null}
};
const store = createStore(
    initialStore,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
