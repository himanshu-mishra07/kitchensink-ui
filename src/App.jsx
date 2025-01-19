import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode' // Use named import
import Login from './components/login/Login'
import AdminDashboard from './components/admin/AdminDashboard'
import UserDashboard from './components/user/UserDashboard'
import Forbidden from './components/Forbidden'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import SignUp from './components/signup/SignUp'
import ApiDetails from './components/endpoints/ApiDetails'
import './App.css'
import { axiosInstance } from './services/apiService' // Ensure axiosInstance is exported from apiService
import { handleLogout as performLogout } from './utils/logout' // Import handleLogout function


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))

  const handleLogin = (token) => {
    setToken(token)
    localStorage.setItem('token', token)
  }

  const handleLogout = async (navigate) => {
    await performLogout(navigate)
    setToken(null)
  }

  const getRolesFromToken = (token) => {
    if (!token) return []
    const decodedToken = jwtDecode(token)
    return decodedToken.roles.map(role => role.authority)
  }

  const roles = getRolesFromToken(token)

  useEffect(() => {
    const handle401Error = () => {
      localStorage.removeItem('token')
      setToken(null)
      if (window.location.pathname !== '/') {
        window.location.href = 'http://localhost:5173/'
      }
    }

    const interceptor = axiosInstance.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          handle401Error()
        }
        return Promise.reject(error)
      }
    )

    return () => {
      axiosInstance.interceptors.response.eject(interceptor)
    }
  }, [])

  return (
    <Router>
      <Header title="Kitchen Sink" onLogout={handleLogout} user={{ roles }} />
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={
          <ProtectedRoute roles={roles} requiredRole="ROLE_ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/user" element={
          <ProtectedRoute roles={roles} requiredRole="ROLE_USER">
            <UserDashboard />
          </ProtectedRoute>
        } />
        <Route path="/api-details" element={<ApiDetails />} />
        <Route path="/403" element={<Forbidden />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App