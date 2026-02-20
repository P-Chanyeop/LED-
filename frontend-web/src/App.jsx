import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import EstimateForm from './pages/EstimateForm'
import AdminPage from './pages/AdminPage'
import './App.css'

function Header() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo-area">
          <div className="logo-icon">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 3L33 11V25L18 33L3 25V11L18 3Z" fill="white" opacity="0.3"/>
              <path d="M18 8L28 14V26L18 32L8 26V14L18 8Z" fill="none" stroke="white" strokeWidth="1.5"/>
              <path d="M12 20L18 14L24 20" stroke="white" strokeWidth="1.5" fill="none"/>
              <path d="M18 14V28" stroke="white" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-sub">LED DISPLAY SOLUTION</span>
            <span className="logo-main">EASY TECH INTERNATIONAL</span>
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <Link to="/" className={!isAdmin ? 'active' : ''}>견적 작성</Link>
        <Link to="/admin" className={isAdmin ? 'active' : ''}>관리자 페이지</Link>
      </nav>
    </header>
  )
}

function Layout() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<EstimateForm />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
