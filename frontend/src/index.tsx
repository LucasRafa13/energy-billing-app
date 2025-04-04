import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // O componente App principal
import './styles.css' // Importando os estilos
import { BrowserRouter } from 'react-router-dom' // Se for usar o React Router

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Certifique-se de que o root existe no HTML
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
