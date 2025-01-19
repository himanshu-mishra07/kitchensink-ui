import { useState } from 'react'
import { registerMember } from '../../services/apiService'
import { validateSingUp } from '../../utils/validation'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    const newErrors = validateSingUp({ name, email, phoneNumber, password, confirmPassword })
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      await registerMember({ name, email, phoneNumber }, password)
      setSuccessMessage('Registration successful')
      setName('')
      setEmail('')
      setPhoneNumber('')
      setPassword('')
      setConfirmPassword('')
      setErrors({})
    } catch (error) {
      setErrorMessage(error.response.data.error)
    }
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center">Sign Up</h2>
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
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
          {successMessage && (
            <p className="text-success text-center">
              {successMessage}
              <br />
              <a href="/">Go to Login Page</a>.
            </p>
          )}
          {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
          <button type="submit" className="btn btn-primary w-100">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp