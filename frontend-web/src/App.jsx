import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import EstimateForm from './pages/EstimateForm'
import AdminPage from './pages/AdminPage'
import './App.css'
import logoImage from './assets/logo.png'

function Header() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'

  return (
    <header className="main-header">
      <div className="header-left">
        <div className="logo-area">
          <img src={logoImage} alt="Logo" style={{ height: '85px', imageRendering: 'crisp-edges' }} />
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
