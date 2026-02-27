import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './LoginPage.css'

function SignupPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.')
      return
    }
    
    if (password.length < 6) {
      alert('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    
    // 회원가입 성공
    alert('회원가입이 완료되었습니다.')
    navigate('/login')
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>LED 견적 시스템</h1>
        <h2>회원가입</h2>
        <form onSubmit={handleSignup} className="login-form">
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
          <div className="form-group">
            <label>비밀번호 확인</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">회원가입</button>
        </form>
        <div className="login-footer">
          <Link to="/login">로그인으로 돌아가기</Link>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
