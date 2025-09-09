import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from './reducer/index.js';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';

const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store = {store}>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
