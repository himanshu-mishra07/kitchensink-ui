import axios from 'axios'

export const handleLogout = async (navigate) => {
  const token = localStorage.getItem('token')
  try {
    await axios.post('http://localhost:8080/api/kitchensink/v1/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    localStorage.removeItem('token')
    navigate('/')
  } catch (error) {
    localStorage.removeItem('token')
    console.error('Logout error:', error)
  }
}