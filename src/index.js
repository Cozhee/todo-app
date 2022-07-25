import React from 'react';
import {createRoot} from 'react-dom/client';
import SettingsProvider from "./Context/Settings";

import App from './app.js';

function Main() {
    return (
        <SettingsProvider>
            <App />
        </SettingsProvider>
    ) ;
}

const container = document.getElementById('root');
const root = createRoot(container)
root.render(<Main />);
