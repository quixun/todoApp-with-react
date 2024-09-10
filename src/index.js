import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createGlobalStyle } from 'styled-components';
import reportWebVitals from './reportWebVitals';

// Define global styles to ensure full-screen behavior for the root element
const GlobalStyle = createGlobalStyle`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <GlobalStyle />
      <App />
    </>
  </React.StrictMode>
);

reportWebVitals();
