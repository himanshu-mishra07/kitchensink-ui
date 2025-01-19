import { Navigate } from 'react-router-dom'

function ProtectedRoute({ roles, requiredRole, children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/" />
  }

  if (!roles.includes(requiredRole)) {
    return <Navigate to="/403" />
  }

  return children
}

export default ProtectedRoute