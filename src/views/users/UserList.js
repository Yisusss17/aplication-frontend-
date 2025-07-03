import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSpinner,
  CAlert,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import UserTable from './UserTable'
import UserEditModal from './UserEditModal'
import UserAddModal from './UserAddModal'
import UserDeleteModal from './UserDeleteModal'

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [filters, setFilters] = useState({
    identity_card: '',
    first_name: '',
    last_name: '',
    role_id: '',
    email: '',
  })

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('No token found. Please login again.')
        setLoading(false)
        return
      }
      const response = await fetch('http://localhost:4000/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }
      const data = await response.json()
      const sortedUsers = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      setUsers(sortedUsers)
    } catch (err) {
      setError('Error fetching users: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line
  }, [])

  // Funciones para editar y eliminar
  const handleEdit = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const handleDelete = (user) => {
    setSelectedUser(user) // <-- aquí debe ser el usuario correcto
    setShowDeleteModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setSelectedUser(null)
    fetchUsers()
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedUser(null)
    fetchUsers()
  }

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Filtrado de usuarios según los filtros activos
  const filteredUsers = users.filter((u) =>
    (!filters.identity_card || u.identity_card?.toLowerCase().includes(filters.identity_card.toLowerCase())) &&
    (!filters.first_name || u.first_name?.toLowerCase().includes(filters.first_name.toLowerCase())) &&
    (!filters.last_name || u.last_name?.toLowerCase().includes(filters.last_name.toLowerCase())) &&
    (!filters.role_id || String(u.role_id).includes(filters.role_id)) &&
    (!filters.email || u.email?.toLowerCase().includes(filters.email.toLowerCase()))
  )

  return (
    <CRow>
      <CCol>
        {/* Filtros avanzados */}
        <CCard className="mb-3">
          <CCardHeader>Filters</CCardHeader>
          <CCardBody>
            <CForm className="row g-3">
              <div className="col-md-2">
                <CFormLabel>Identity Card</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Search Identity Card"
                  name="identity_card"
                  value={filters.identity_card}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-2">
                <CFormLabel>First Name</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Search First Name"
                  name="first_name"
                  value={filters.first_name}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-2">
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Search Last Name"
                  name="last_name"
                  value={filters.last_name}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="col-md-2">
                <CFormLabel>Role ID</CFormLabel>
                <select
                  className="form-select"
                  name="role_id"
                  value={filters.role_id}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="2">Admin</option>
                  <option value="1">Doctor</option>
                </select>
              </div>
              <div className="col-md-2">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="text"
                  placeholder="Search Email"
                  name="email"
                  value={filters.email}
                  onChange={handleFilterChange}
                />
              </div>
            </CForm>
          </CCardBody>
        </CCard>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>User List</strong>
            <div className="float-end d-flex gap-2">
              <CButton
                color="success"
                size="sm"
                className="fw-semibold"
                onClick={() => setShowAddModal(true)}
              >
                + Add User
              </CButton>
              <CButton
                color="info"
                size="sm"
                className="fw-semibold"
                onClick={fetchUsers}
              >
                Refresh
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            {loading && (
              <div className="text-center">
                <CSpinner color="primary" />
              </div>
            )}
            {error && <CAlert color="danger">{error}</CAlert>}
            {!loading && !error && filteredUsers.length > 0 && (
              <UserTable users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
            )}
            {!loading && !error && filteredUsers.length === 0 && (
              <p className="text-center">No users found.</p>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal de agregar usuario */}
      <UserAddModal
        visible={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          fetchUsers()
        }}
      />

      {/* Modal de edición */}
      <UserEditModal
        visible={showEditModal}
        user={selectedUser}
        onClose={handleCloseEditModal}
      />

      {/* Modal de eliminación */}
      <UserDeleteModal
        visible={showDeleteModal}
        user={selectedUser}
        onClose={handleCloseDeleteModal}
        onUserDeleted={fetchUsers}
      />
    </CRow>
  )
}

export default UserList