import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './LoginPage.css'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    
    // 마스터 계정 확인
    if (username === 'admin' && password === 'admin1234') {
      localStorage.setItem('isLoggedIn', 'true')
      navigate('/')
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>LED 견적 시스템</h1>
        <h2>로그인</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>아이디</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>비밀번호</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">로그인</button>
        </form>
        <div className="login-footer">
          <Link to="/signup">회원가입</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
