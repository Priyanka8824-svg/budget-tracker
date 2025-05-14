import './App.css';
import React from 'react';
import { BrowserRouter, Router, Routes } from 'react-router-dom';

import BudgetComparison from './components/BudgetComparison';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
        <BudgetComparison/>
        <Dashboard/>
        <Login/>
        <Register/>
    </div>
  );
}

export default App;
