import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

import { CadastroProvider } from '@/context/CadastroContext'; // ✅ importa o provider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CadastroProvider> {/* ✅ envolve App com provider */}
        <App />
      </CadastroProvider>
    </BrowserRouter>
  </React.StrictMode>
);
