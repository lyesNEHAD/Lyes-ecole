import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './components/Dashboard.jsx'
import Checklist from './components/Checklist.jsx'
import Formulaire from './components/Formulaire.jsx'
import './assets/css/App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/checklist/:id" element={<Checklist />} />
          <Route path="/formulaire" element={<Formulaire />} />
          <Route path="/formulaire/:id" element={<Formulaire />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
