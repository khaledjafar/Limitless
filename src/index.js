// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css'; 
import { App } from './App'; 

// import CursorTrail from './CursorTrail';  

createRoot(document.getElementById('root')).render(
  <>
    {/* <CursorTrail />  */}
    <App /> 
  </>
);