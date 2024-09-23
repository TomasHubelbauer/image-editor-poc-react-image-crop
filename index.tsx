import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootDiv = document.querySelector('#rootDiv');
if (!rootDiv) {
  throw new Error('#rootDiv not in the DOM');
}

ReactDOM.createRoot(rootDiv).render(<App />);
