import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/apiService'
import {jwtDecode} from 'jwt-decode'
import './Login.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { token } = await login(username, password)
      const decodedToken = jwtDecode(token)
      const roleNames = decodedToken.roles.map(role => role.authority)
      onLogin(token, roleNames)
      if (roleNames.includes('ROLE_ADMIN')) {
        navigate('/admin')
      } else {
        navigate('/user')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Invalid username or password')
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-danger text-center">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="text-center mt-3">
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login