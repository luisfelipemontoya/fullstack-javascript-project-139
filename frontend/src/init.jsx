import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

import App from './App.jsx'
import createI18n from './i18n';
import createAppStore from './store/index.js';
import rollbarConfig from './rollbar.js';
import createSocketApi from './socket/index.js';

const init = async (socket) => {
    const i18n = await createI18n();
    const store = createAppStore();
    const socketApi = createSocketApi(socket);

    return (
        <StrictMode>
            <I18nextProvider i18n={i18n}>
                <RollbarProvider config={rollbarConfig}>
                    <Provider store={store}>
                        <ErrorBoundary>
                            <App socket={socketApi} />
                        </ErrorBoundary>
                    </Provider>
                </RollbarProvider>
            </I18nextProvider>
        </StrictMode>
    );
};

export default init;
