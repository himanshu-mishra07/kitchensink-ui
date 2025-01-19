import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Header.css'

function Header({ title, onLogout, user = { roles: [] } }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogoClick = () => {
    if (user.roles.includes('ROLE_ADMIN')) {
      navigate('/admin')
    } else if (user.roles.includes('ROLE_USER')) {
      navigate('/user')
    } else {
      navigate('/')
    }
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const handleLogout = () => {
    onLogout()
    navigate('/')
  }

  const isLoginPage = location.pathname === '/signup' || location.pathname === '/'

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white w-100 sticky-top">
      <div className="container-fluid">
        <div className="navbar-brand" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src="src/assets/mongoDb.svg" alt="Logo" className="logo" />
          {title}
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isLoginPage && (
              <li className="nav-item dropdown">
                <button
                  className="btn btn-outline-success dropdown-toggle"
                  type="button"
                  id="userDropdown"
                  aria-expanded={dropdownOpen}
                  onClick={toggleDropdown}
                >
                  <i className="bi bi-person-circle"></i>
                </button>
                <ul className={`dropdown-menu dropdown-menu-end ${dropdownOpen ? 'show' : ''} custom-dropdown`} aria-labelledby="userDropdown">
                  <li><Link to="/user" className="dropdown-item">User Page</Link></li>
                  <li><Link to="/api-details" className="dropdown-item">API Details</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  )
}

export default Header