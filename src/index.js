import React from 'react';
import { render } from 'react-dom';
// import './index.css';
import { App } from './App/App';
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

render(
    <App />,
    document.getElementById('root')
);