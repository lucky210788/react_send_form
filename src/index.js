import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UsersProvider from "./providers/UsersProvider";
import './scss/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UsersProvider>
            <App/>
        </UsersProvider>
    </React.StrictMode>
);
