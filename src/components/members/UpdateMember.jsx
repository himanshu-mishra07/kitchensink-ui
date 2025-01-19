import { useState } from 'react'
import { updateMember } from '../../services/apiService'

function UpdateMember({ member, onClose }) {
  const [name, setName] = useState(member.name)
  const [email] = useState(member.email) // Email is not editable
  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber)
  const [roles, setRoles] = useState(member.roles || [])
  const [nameError, setNameError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber.length === 10 && /^\d+$/.test(phoneNumber)
  }

  const validateName = (name) => {
    return isNaN(name)
  }

  const handleRoleChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setRoles([...roles, value])
    } else {
      setRoles(roles.filter(role => role !== value))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let valid = true

    if (name.length <= 1) {
      setNameError('Name must be greater than 1 character')
      valid = false
    } else if (!validateName(name)) {
      setNameError('Name must not be a number')
      valid = false
    } else {
      setNameError('')
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setPhoneNumberError('Phone number must be 10 digits')
      valid = false
    } else {
      setPhoneNumberError('')
    }

    if (!valid) {
      return
    }

    try {
      await updateMember(member.id, { name, email, phoneNumber }, roles, '')
      setSuccess('Member updated successfully')
      onClose()
    } catch (error) {
      setError('Error updating member')
    }
  }

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Member</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className={`form-control ${nameError ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError && <div className="invalid-feedback">{nameError}</div>}
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
                  className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {phoneNumberError && <div className="invalid-feedback">{phoneNumberError}</div>}
              </div>
              <div className="mb-3 text-start">
                <label className="form-label">Roles</label>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="ADMIN"
                    checked={roles.includes('ADMIN')}
                    onChange={handleRoleChange}
                  />
                  <label className="form-check-label">Admin</label>
                </div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    value="USER"
                    checked={roles.includes('USER')}
                    onChange={handleRoleChange}
                  />
                  <label className="form-check-label">User</label>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Update Member</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UpdateMember