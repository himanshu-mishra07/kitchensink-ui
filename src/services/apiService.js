import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api/kitchensink/v1'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    Authorization: `Bearer ${token}`
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/') {
        window.location.href = 'http://localhost:5173/'
      }
    }
    return Promise.reject(error)
  }
)

//ADMIN
export const fetchMembers = async () => {
  const response = await axiosInstance.get('/members', {
    headers: getAuthHeaders()
  })
  return response.data
}

//ALL having valid username and password
export const login = async (username, password) => {
  const response = await axiosInstance.post('/auth/token', {
    username,
    password
  })
  return response.data
}

//ADMIN or USER
export const logout = async () => {
  const response = await axiosInstance.post('/auth/logout', {}, {
    headers: getAuthHeaders()
  })
  localStorage.removeItem('token')
}

//ADMIN
export const addMember = async (member, roles = []) => {
  const response = await axiosInstance.post('/members', {
    member,
    roles
  }, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  })
  return response.data
}

//ADMIN
export const updateMember = async (id, member, roles = [], password = '') => {
  const response = await axiosInstance.put(`/members/${id}`, {
    member,
    roles,
    password
  }, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  })
  return response.data
}

//ADMIN
export const deleteMember = async (id) => {
  try {
    const response = await axiosInstance.delete(`/members/${id}`, {
      headers: getAuthHeaders()
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message)
    }
    throw error
  }
}

//ADMIN or USER
export const getUserDetails = async (email) => {
  const response = await axiosInstance.get(`/members/email/${email}`, {
    headers: getAuthHeaders()
  })
  return response.data
}

//ADMIN or USER
export const updateUserDetails = async (id, member, password = '') => {
  const response = await axiosInstance.put(`/members/update/${id}`,{
    member,
    password
  }, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  })
  return response.data
}

//ALL
export const registerMember = async (member, password) => {
  const response = await axiosInstance.post('/members/register', {
    member,
    password
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export { axiosInstance }