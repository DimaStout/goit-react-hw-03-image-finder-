import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';

import './index.css';
import { ThemeProvider } from 'styled-components';
import { StyledEngineProvider } from '@mui/material/styles';

import { theme } from './theme';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <App />
        <ToastContainer />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
