import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import "src/scss/user.scss"
const UserList = () => {
    const [users, setUsers] = useState([
        { id: 1, identity_card: '12345678', first_name: 'John', last_name: 'Doe', role_id: 1, email: 'john@example.com' },
        { id: 2, identity_card: '87654321', first_name: 'Jane', last_name: 'Smith', role_id: 2, email: 'jane@example.com' },
      ])
      const [filters, setFilters] = useState({
        id: '',
        identity_card: '',
        first_name: '',
        last_name: '',
        role_id: '',
        email: '',
      })

      const [newUser, setNewUser] = useState({
        identity_card: '',
        first_name: '',
        last_name: '',
        role_id: 1,
        email: '',
      })
      const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({
          ...filters,
          [name]: value,
        })
      }
      const filteredUsers = users.filter((user) => {
        return (
          (filters.id === '' || user.id.toString().includes(filters.id)) &&
          (filters.identity_card === '' || user.identity_card.includes(filters.identity_card)) &&
          (filters.first_name === '' || user.first_name.toLowerCase().includes(filters.first_name.toLowerCase())) &&
          (filters.last_name === '' || user.last_name.toLowerCase().includes(filters.last_name.toLowerCase())) &&
          (filters.role_id === '' || user.role_id.toString() === filters.role_id) &&
          (filters.email === '' || user.email.toLowerCase().includes(filters.email.toLowerCase()))
        )
      })

      const [visible, setVisible] = useState(false) 
      const [selectedUser, setSelectedUser] = useState(null)
      const [addVisible, setAddVisible] = useState(false) 
      const [confirmVisible, setConfirmVisible] = useState(false) // Controla la visibilidad de la ventana de confirmación
const [userToDelete, setUserToDelete] = useState(null) // Almacena el ID del usuario que se desea eliminar
      
      
      const handleEdit = (user) => {
        setSelectedUser(user) 
        setVisible(true) 
      }

      const handleSave = () => {
        setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)))
        setVisible(false) 
      }

      const handleAddUser = (newUser) => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]) // Agrega el nuevo usuario con un ID único
        setAddVisible(false) // Cierra la modal
      }
      
      const handleDelete = (id) => {
        setUsers(users.filter((user) => user.id !== id)) // Filtra los usuarios y elimina el que coincide con el ID
      }

      const handleDeleteClick = (id) => {
        setUserToDelete(id) // Establece el ID del usuario que se desea eliminar
        setConfirmVisible(true) // Muestra la ventana de confirmación
      }

      const confirmDelete = () => {
        setUsers(users.filter((user) => user.id !== userToDelete)) // Elimina el usuario con el ID especificado
        setConfirmVisible(false) // Cierra la ventana de confirmación
        setUserToDelete(null) // Limpia el estado del usuario a eliminar
      }
      
  return (

  
    <>
  <CCard className="mb-3">
  <CCardHeader>Filters</CCardHeader>
  <CCardBody>
    <CForm className="row g-3">
      <div className="col-md-2">
        <CFormLabel>ID</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search ID"
          name="id"
          value={filters.id}
          onChange={handleFilterChange}
        />
      </div>
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
        <CFormLabel>Role</CFormLabel>
        <CFormSelect
          name="role_id"
          value={filters.role_id}
          onChange={handleFilterChange}
        >
          <option value="">All Roles</option>
          <option value="1">Admin</option>
          <option value="2">doctor</option>
        </CFormSelect>
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

    <div>
    <CCardHeader>
  <CButton style={{margin: '10px'}} color="success" onClick={() => setAddVisible(true)}>
    Add User
  </CButton>
  
</CCardHeader>
    </div>
    <CCard className="table-responsive">
        <CCardHeader>List of Users</CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Identity Card</CTableHeaderCell>
                <CTableHeaderCell>First Name</CTableHeaderCell>
                <CTableHeaderCell>Last Name</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
   
  {filteredUsers.map((user) => (
    <CTableRow key={user.id}>
      <CTableDataCell>{user.id}</CTableDataCell>
      <CTableDataCell>{user.identity_card}</CTableDataCell>
      <CTableDataCell>{user.first_name}</CTableDataCell>
      <CTableDataCell>{user.last_name}</CTableDataCell>
      <CTableDataCell>{user.role_id === 1 ? 'Admin' : 'doctor'}</CTableDataCell>
      <CTableDataCell>{user.email}</CTableDataCell>
      <CTableDataCell>
        <div className='buttom_action'>
        <CButton className='buttom_action_1' color="primary" size="sm" onClick={() => handleEdit(user)}>Edit</CButton>{' '}
        <CButton
  className="buttom_action_2"
  color="danger"
  size="sm"
  onClick={() => handleDeleteClick(user.id)} // Llama a la función para mostrar la ventana de confirmación
>
  Delete
</CButton>
          </div>
        
      </CTableDataCell>
    </CTableRow>
  ))}
</CTableBody>
        </CTable>
      </CCardBody>

      <CModal visible={visible} onClose={() => setVisible(false)}>
  <CModalHeader>
    <CModalTitle>Edit User</CModalTitle>
  </CModalHeader>
  <CModalBody>
    {selectedUser && (
      <CForm>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedUser.id}
            disabled
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Identity Card</CFormLabel>
          <CFormInput
            type="text"
            value={selectedUser.identity_card}
            onChange={(e) => setSelectedUser({ ...selectedUser, identity_card: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>First Name</CFormLabel>
          <CFormInput
            type="text"
            value={selectedUser.first_name}
            onChange={(e) => setSelectedUser({ ...selectedUser, first_name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput
            type="text"
            value={selectedUser.last_name}
            onChange={(e) => setSelectedUser({ ...selectedUser, last_name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Role</CFormLabel>
          <CFormSelect
            value={selectedUser.role_id}
            onChange={(e) => setSelectedUser({ ...selectedUser, role_id: parseInt(e.target.value) })}
          >
            <option value={1}>Admin</option>
            <option value={2}>doctor</option>
          </CFormSelect>
        </div>
        <div className="mb-3">
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            value={selectedUser.email}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
        </div>
      </CForm>
    )}
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setVisible(false)}>
    Cancel
    </CButton>
    <CButton color="primary" onClick={handleSave}>
    Save Changes
    </CButton>
  </CModalFooter>
</CModal>
    </CCard>
    <CModal visible={addVisible} onClose={() => setAddVisible(false)}>
  <CModalHeader>
    <CModalTitle>Add New User</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CForm>
      <div className="mb-3">
        <CFormLabel>Identity Card</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Identity Card"
          value={newUser.identity_card}
          onChange={(e) => setNewUser({ ...newUser, identity_card: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>First Name</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter First Name"
          value={newUser.first_name}
          onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Last Name</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Last Name"
          value={newUser.last_name}
          onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Role</CFormLabel>
        <CFormSelect
          value={newUser.role_id}
          onChange={(e) => setNewUser({ ...newUser, role_id: parseInt(e.target.value) })}
        >
          <option value={1}>Admin</option>
          <option value={2}>doctor</option>
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel>Email</CFormLabel>
        <CFormInput
          type="email"
          placeholder="Enter Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
      </div>
    </CForm>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setAddVisible(false)}>
      Cancel
    </CButton>
    <CButton color="primary" onClick={() => handleAddUser(newUser)}>
      Add User
    </CButton>
  </CModalFooter>
</CModal>


<CModal visible={confirmVisible} onClose={() => setConfirmVisible(false)}>
  <CModalHeader>
    <CModalTitle>Confirm Delete</CModalTitle>
  </CModalHeader>
  <CModalBody>
    Are you sure you want to delete this user? This action cannot be undone.
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setConfirmVisible(false)}>
      Cancel
    </CButton>
    <CButton color="danger" onClick={confirmDelete}>
      Delete
    </CButton>
  </CModalFooter>
</CModal>
    </>
    
  )
  
}

export default UserList