import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NotesContextProvider } from './contexts/NotesContext';
import { AuthContextProvider} from './contexts/AuthContext'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <NotesContextProvider>
        <App/>
      </NotesContextProvider>
    </AuthContextProvider>
    
  </React.StrictMode>
)