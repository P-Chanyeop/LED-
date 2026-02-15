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
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="8" fill="white"/>
              <path d="M10 20L20 10L30 20L20 30L10 20Z" fill="#4ECDC4"/>
              <path d="M20 10V30" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <div className="logo-text">
            <div className="logo-small">LED DISPLAY SOLUTION</div>
            <div className="logo-main">EASY TECH INTERNATIONAL</div>
          </div>
        </div>
      </div>
      <nav className="header-nav">
        <Link to="/" className={!isAdmin ? 'active' : ''}>
          견적 작성
        </Link>
        <Link to="/admin" className={isAdmin ? 'active' : ''}>
          관리자 페이지
        </Link>
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
