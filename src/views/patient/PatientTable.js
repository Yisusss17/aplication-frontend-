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
const PatientList = () => {
    const [patients, setPatients] = useState([
        { id: 1, identity_card: '12345678', first_name: 'John', last_name: 'Doe', adress: `San Cristobal`, phone: `04247214766`, email: 'john@example.com' },
        { id: 2, identity_card: '87654321', first_name: 'Jane', last_name: 'Smith', adress: `Rubio`, phone: `04247214766`, email: 'jane@example.com' },
      ])
      const [filters, setFilters] = useState({
        id: '',
        identity_card: '',
        first_name: '',
        last_name: '',
        adress: '',
        phone: '',
        email: '',
      })

      const [newPatient, setNewPatient] = useState({
        identity_card: '',
        first_name: '',
        last_name: '',
        adress: '',
        phone: '',
        email: '',
      })
      const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({
          ...filters,
          [name]: value,
        })
      }
      const filteredPatients = patients.filter((patient) => {
        return (
          (filters.id === '' || patient.id.toString().includes(filters.id)) &&
          (filters.identity_card === '' || patient.identity_card.includes(filters.identity_card)) &&
          (filters.first_name === '' || patient.first_name.toLowerCase().includes(filters.first_name.toLowerCase())) &&
          (filters.last_name === '' || patient.last_name.toLowerCase().includes(filters.last_name.toLowerCase())) &&
          (filters.adress === '' || patient.adress.toLowerCase().includes(filters.adress.toLowerCase())) &&
          (filters.phone === '' || patient.phone.toLowerCase().includes(filters.phone.toLowerCase())) &&
          (filters.email === '' || patient.email.toLowerCase().includes(filters.email.toLowerCase()))
        )
      });

      const [visible, setVisible] = useState(false) 
      const [selectedPatient, setSelectedPatient] = useState(null)
      const [addVisible, setAddVisible] = useState(false) 
      const [confirmVisible, setConfirmVisible] = useState(false) // Controla la visibilidad de la ventana de confirmación
const [patientToDelete, setPatientToDelete] = useState(null) // Almacena el ID del usuario que se desea eliminar
      
      
      const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setVisible(true);
      };

      const handleSave = () => {
        setPatients(patients.map((patient) => (patient.id === selectedPatient.id ? selectedPatient : patient)));
        setVisible(false);
      };

      const handleAddPatient = (newPatient) => {
        setPatients([...patients, { ...newPatient, id: patients.length + 1 }]);
        setAddVisible(false);
      };

      const handleDelete = (id) => {
        setPatients(patients.filter((patient) => patient.id !== id)) // Filtra los usuarios y elimina el que coincide con el ID
      }

      const handleDeleteClick = (id) => {
        setPatientToDelete(id);
        setConfirmVisible(true);
      };

      const confirmDelete = () => {
        setPatients(patients.filter((patient) => patient.id !== patientToDelete));
        setConfirmVisible(false);
        setPatientToDelete(null);
      };
      
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
        <CFormLabel>Adress</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search Adress"
          name="adress"
          value={filters.adress}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-md-2">
        <CFormLabel>Phone</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search Phone"
          name="phone"
          value={filters.phone}
          onChange={handleFilterChange}
        />
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
    Add Patient
  </CButton>
  
</CCardHeader>
    </div>
    <CCard className="table-responsive">
        <CCardHeader>List of Patients</CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Identity Card</CTableHeaderCell>
                <CTableHeaderCell>First Name</CTableHeaderCell>
                <CTableHeaderCell>Last Name</CTableHeaderCell>
                <CTableHeaderCell>Adress</CTableHeaderCell>
                <CTableHeaderCell>Phone</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
   
  {filteredPatients.map((patient) => (
    <CTableRow key={patient.id}>
      <CTableDataCell>{patient.id}</CTableDataCell>
      <CTableDataCell>{patient.identity_card}</CTableDataCell>
      <CTableDataCell>{patient.first_name}</CTableDataCell>
      <CTableDataCell>{patient.last_name}</CTableDataCell>
      <CTableDataCell>{patient.adress}</CTableDataCell>
      <CTableDataCell>{patient.phone}</CTableDataCell>
      <CTableDataCell>{patient.email}</CTableDataCell>
      <CTableDataCell>
        <div className='buttom_action'>
        <CButton className='buttom_action_1' color="primary" size="sm" onClick={() => handleEdit(patient)}>Edit</CButton>{' '}
        <CButton
  className="buttom_action_2"
  color="danger"
  size="sm"
  onClick={() => handleDeleteClick(patient.id)} // Llama a la función para mostrar la ventana de confirmación
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
    <CModalTitle>Edit Patient</CModalTitle>
  </CModalHeader>
  <CModalBody>
    {selectedPatient && (
      <CForm>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedPatient.id}
            disabled
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Identity Card</CFormLabel>
          <CFormInput
            type="text"
            value={selectedPatient.identity_card}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, identity_card: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>First Name</CFormLabel>
          <CFormInput
            type="text"
            value={selectedPatient.first_name}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, first_name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Last Name</CFormLabel>
          <CFormInput
            type="text"
            value={selectedPatient.last_name}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, last_name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Adress</CFormLabel>
          <CFormInput
            type="text"
            value={selectedPatient.adress}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, adress: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Phone</CFormLabel>
          <CFormInput
            type="text"
            value={selectedPatient.phone}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, phone: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Email</CFormLabel>
          <CFormInput
            type="email"
            value={selectedPatient.email}
            onChange={(e) => setSelectedPatient({ ...selectedPatient, email: e.target.value })}
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
    <CModalTitle>Add New Patient</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CForm>
      <div className="mb-3">
        <CFormLabel>Identity Card</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Identity Card"
          value={newPatient.identity_card}
          onChange={(e) => setNewPatient({ ...newPatient, identity_card: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>First Name</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter First Name"
          value={newPatient.first_name}
          onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Last Name</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Last Name"
          value={newPatient.last_name}
          onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Adress</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Adress"
          value={newPatient.adress}
          onChange={(e) => setNewPatient({ ...newPatient, adress: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Phone</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Phone"
          value={newPatient.phone}
          onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Email</CFormLabel>
        <CFormInput
          type="email"
          placeholder="Enter Email"
          value={newPatient.email}
          onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
        />
      </div>
    </CForm>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setAddVisible(false)}>
      Cancel
    </CButton>
    <CButton color="primary" onClick={() => handleAddPatient(newPatient)}>
      Add Patient
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

export default PatientList