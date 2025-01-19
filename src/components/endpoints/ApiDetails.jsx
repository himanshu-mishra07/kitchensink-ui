import { useLocation } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'

const apiEndpoints = {
  ADMIN: [
    {
      method: 'GET',
      endpoint: '/members',
      description: 'Fetch all members'
    },
    {
      method: 'POST',
      endpoint: '/members',
      description: 'Add a new member'
    },
    {
      method: 'DELETE',
      endpoint: '/members/:id',
      description: 'Delete a member'
    }
  ],
  USER: [
    {
      method: 'POST',
      endpoint: '/auth/logout',
      description: 'Logout'
    },
    {
        method: 'GET',
        endpoint: '/members/:emailid',
        description: 'Get member by email id'
    }
  ],
  ALL: [
    {
      method: 'POST',
      endpoint: '/auth/token',
      description: 'Login'
    }
  ]
}

const ApiDetails = () => {
  const location = useLocation()
  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const roles = decodedToken.roles.map(role => role.authority.replace('ROLE_', ''))

  const getEndpointsForRole = (role) => {
    return apiEndpoints[role] || []
  }

  const adminEndpoints = getEndpointsForRole('ADMIN')
  const userEndpoints = getEndpointsForRole('USER')
  const allEndpoints = apiEndpoints.ALL

  return (
    <div className="container mt-5">
      <h2 className="mb-4">API Endpoints</h2>
      {roles.includes('ADMIN') && (
        <>
          <h4>Admin Endpoints</h4>
          <ul className="list-group mb-4">
            {adminEndpoints.map((endpoint, index) => (
              <li key={index} className="list-group-item">
                <strong>{endpoint.method}</strong> {endpoint.endpoint} - {endpoint.description}
              </li>
            ))}
          </ul>
        </>
      )}
      {roles.includes('USER') && (
        <>
          <h4>User Endpoints</h4>
          <ul className="list-group mb-4">
            {userEndpoints.map((endpoint, index) => (
              <li key={index} className="list-group-item">
                <strong>{endpoint.method}</strong> {endpoint.endpoint} - {endpoint.description}
              </li>
            ))}
          </ul>
        </>
      )}
      <h4>Common Endpoints</h4>
      <ul className="list-group mb-4">
        {allEndpoints.map((endpoint, index) => (
          <li key={index} className="list-group-item">
            <strong>{endpoint.method}</strong> {endpoint.endpoint} - {endpoint.description}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ApiDetails