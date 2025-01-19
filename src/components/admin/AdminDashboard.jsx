import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/apiService'
import ListMembers from '../members/ListMembers'
import Header from '../header/Header'
import Footer from '../footer/Footer'

function AdminDashboard() {
  const navigate = useNavigate()
  const [refreshMembers, setRefreshMembers] = useState(false)

  const handleRefreshMembers = () => {
    setRefreshMembers(!refreshMembers) // Trigger refresh
  }

  return (
    <div>
      <div className="container mt-4">
        <ListMembers refreshMembers={refreshMembers} onAddMember={handleRefreshMembers} />
      </div>
    </div>
  )
}

export default AdminDashboard