export const validateForm = ({ name, email, phoneNumber, password, confirmPassword }) => {
    const errors = {}
    if (!name) {
      errors.name = 'Name is required'
    } else if (!isNaN(name)) {
      errors.name = 'Name should not be a number'
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address'
    }
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
    } else if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits'
    }
    if (password) {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      if (!passwordRegex.test(password)) {
        errors.password = 'Password must be at least 8 characters long and contain at least one number and one special character'
      }
      if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords do not match'
      }
    }
    return errors
  }

  export const validateSingUp = ({ name, email, phoneNumber, password, confirmPassword }) => {
    const errors = {}
    if (!name) {
      errors.name = 'Name is required'
    } else if (!isNaN(name)) {
      errors.name = 'Name should not be a number'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Invalid email address'
    }
    if (!phoneNumber) {
      errors.phoneNumber = 'Phone number is required'
    } else if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be 10 digits'
    }
    if (!password) {
      errors.password = 'Password is required'
    } else {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
      if (!passwordRegex.test(password)) {
        errors.password = 'Password must be at least 8 characters long and contain at least one number and one special character'
      }
    }
  
    if (password && password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    return errors
  }