import { useState, useEffect } from 'react'
import { fetchMembers, deleteMember } from '../../services/apiService'
import {jwtDecode} from 'jwt-decode'
import UpdateMember from './UpdateMember'
import AddMember from './AddMember'
import ConfirmModal from './ConfirmModal'
import ErrorModal from './ErrorModal'

function ListMembers({ refreshMembers, onAddMember }) {
  const [members, setMembers] = useState([])
  const [selectedMember, setSelectedMember] = useState(null)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [memberToDelete, setMemberToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [membersPerPage] = useState(5)
  const [errorMessage, setErrorMessage] = useState('')

  const getMembers = async () => {
    try {
      const data = await fetchMembers()
      const formattedMembers = data.map(item => ({
        ...item.member,
        roles: item.roles.map(role => role.replace('ROLE_', ''))
      }))
      setMembers(formattedMembers)
    } catch (error) {
      console.error('Error fetching members:', error)
    }
  }

  useEffect(() => {
    getMembers()
  }, [refreshMembers])

  const handleDelete = async () => {
    setErrorMessage('')
    try {
      await deleteMember(memberToDelete.id)
      setMembers(members.filter(member => member.id !== memberToDelete.id))
      setShowConfirmModal(false)
      setMemberToDelete(null)
    } catch (error) {
      setErrorMessage(error.message)
      setShowConfirmModal(false)
      setShowErrorModal(true)
    }
  }

  const handleCloseErrorModal = () => {
    setShowErrorModal(false)
    setErrorMessage('')
  }

  const handleDeleteClick = (member) => {
    setMemberToDelete(member)
    setShowConfirmModal(true)
  }

  const handleUpdateClick = (member) => {
    setSelectedMember(member)
    setShowUpdateModal(true)
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false)
    setSelectedMember(null)
    getMembers() // Refresh the member list
  }

  const handleAddMemberClick = () => {
    setShowAddMemberModal(true)
  }

  const handleCloseAddMemberModal = () => {
    setShowAddMemberModal(false)
    getMembers() // Refresh the member list
  }

  // Get current members
  const indexOfLastMember = currentPage * membersPerPage
  const indexOfFirstMember = indexOfLastMember - membersPerPage
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const email = decodedToken.sub

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center flex-grow-1">List of Members</h2>
        <button className="btn btn-primary" onClick={handleAddMemberClick}>Add Member</button>
      </div>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map(member => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.roles.join(', ')}</td>
              <td>
                <button 
                  className="btn btn-warning me-2" 
                  onClick={() => handleUpdateClick(member)}
                  disabled={member.email === email}
                >Update</button>
                <button 
                  className="btn btn-danger" 
                  onClick={() => handleDeleteClick(member)}
                  disabled={member.email === email}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {members.length > membersPerPage && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: Math.ceil(members.length / membersPerPage) }, (_, index) => (
              <li key={index + 1} className="page-item">
                <button onClick={() => paginate(index + 1)} className="page-link">
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      {showUpdateModal && <UpdateMember member={selectedMember} onClose={handleCloseUpdateModal} />}
      {showAddMemberModal && <AddMember onClose={handleCloseAddMemberModal} />}
      <ConfirmModal
        show={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this member?"
      />
      <ErrorModal
        show={showErrorModal}
        onClose={handleCloseErrorModal}
        message={errorMessage}
      />
    </div>
  )
}

export default ListMembers