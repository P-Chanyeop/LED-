import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import EstimateForm from './pages/EstimateForm'
import TabletEstimateForm from './pages/TabletEstimateForm'
import AdminPage from './pages/AdminPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import './App.css'
import logoImage from './assets/logo.png'

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  return isLoggedIn ? children : <Navigate to="/login" />
}

function Header() {
  const location = useLocation()
  const isAdmin = location.pathname === '/admin'
  
  // 태블릿 모드에서는 헤더 숨김
  const params = new URLSearchParams(location.search)
  const isTabletMode = params.get('mode') === 'tablet'
  
  // 로그인/회원가입 페이지에서는 헤더 숨김
  if (isTabletMode || location.pathname === '/login' || location.pathname === '/signup') return null

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    window.location.href = '/login'
  }

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
        <button onClick={handleLogout} style={{marginLeft: '20px', padding: '8px 16px', background: '#ff4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>로그아웃</button>
      </nav>
    </header>
  )
}

function Layout() {
  const location = useLocation()
  const [isTabletMode, setIsTabletMode] = useState(false)
  
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setIsTabletMode(params.get('mode') === 'tablet')
  }, [location.search])
  
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={
          <PrivateRoute>
            {isTabletMode ? <TabletEstimateForm /> : <EstimateForm />}
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        } />
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
