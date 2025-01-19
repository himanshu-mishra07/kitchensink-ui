import { useState, useEffect } from 'react'
import { getUserDetails, updateUserDetails } from '../../services/apiService'
import { jwtDecode } from 'jwt-decode'
import { validateForm } from '../../utils/validation'

function UserDashboard() {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token')
        const decodedToken = jwtDecode(token)
        const email = decodedToken.sub
        const userDetails = await getUserDetails(email)
        setId(userDetails.id)
        setName(userDetails.name)
        setEmail(userDetails.email)
        setPhoneNumber(userDetails.phoneNumber)
      } catch (error) {
        setErrorMessage('Failed to fetch user details')
      }
    }

    fetchUserDetails()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    const newErrors = validateForm({ name, email, phoneNumber, password, confirmPassword })
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      await updateUserDetails(id, { name, email, phoneNumber }, password)
      setSuccessMessage('Details updated successfully')
      setPassword('') // Clear the password field after successful update
      setConfirmPassword('') // Clear the confirm password field after successful update
    } catch (error) {
      setErrorMessage('Failed to update details')
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h4 className="text-center">User Dashboard</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
            <small className="text-muted">Email address cannot be changed</small>
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-3 text-start">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary w-100">Update Details</button>
        </form>
      </div>
    </div>
  )
}

export default UserDashboard