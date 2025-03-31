import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import './styles/base.scss'

import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
