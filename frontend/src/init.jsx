import './i18n';
import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import App from './App.jsx'
import store from './store/index.js';
import rollbarConfig from './rollbar.js';
import createSocketApi from './socket/index.js';

const init = async (socket) => {
    const socketApi = createSocketApi(socket);

    return (
        <StrictMode>
            <RollbarProvider config={rollbarConfig}>
                <Provider store={store}>
                    <ErrorBoundary>
                        <App socket={socketApi} />
                    </ErrorBoundary>
                </Provider>
            </RollbarProvider>
        </StrictMode>
    );
};

export default init;
