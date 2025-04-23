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
const MedicationList = () => {
    const [meds, setMeds] = useState([
        { id: 1, name: 'Acetaminophen', dosage: '325 mg', category: 1 },
        { id: 2, name: 'Yonal', dosage: '5 ml', category: 2 },
      ])
      const [filters, setFilters] = useState({
        id: '',
        name: '',
        dosage: '',
        category: '',
      })

      const [newMed, setNewMed] = useState({
        name: '',
        dosage: '',
        category: 1,
      })
      const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({
          ...filters,
          [name]: value,
        })
      }
      const filteredMeds = meds.filter((med) => {
        return (
          (filters.id === '' || med.id.toString().includes(filters.id)) &&
          (filters.name === '' || med.name.includes(filters.name)) &&
          (filters.dosage === '' || med.dosage.toLowerCase().includes(filters.dosage.toLowerCase())) &&
          (filters.category === '' || med.category.toLowerCase().includes(filters.category.toLowerCase()))
        )
      })

      const [visible, setVisible] = useState(false) 
      const [selectedMed, setSelectedMed] = useState(null)
      const [addVisible, setAddVisible] = useState(false) 
      const [confirmVisible, setConfirmVisible] = useState(false) // Controla la visibilidad de la ventana de confirmación
const [medToDelete, setMedToDelete] = useState(null) // Almacena el ID del usuario que se desea eliminar

      
      const handleEdit = (med) => {
        setSelectedMed(med) 
        setVisible(true) 
      }

      const handleSave = () => {
        setMeds(meds.map((med) => (med.id === selectedMed.id ? selectedMed : med)))
        setVisible(false) 
      }

      const handleAddMed = (newMed) => {
        setMeds([...meds, { ...newMed, id: meds.length + 1 }]) // Agrega el nuevo medicamento con un ID único
        setAddVisible(false) // Cierra la modal
      }
      
      const handleDelete = (id) => {
        setMeds(meds.filter((med) => med.id !== id)) // Filtra los usuarios y elimina el que coincide con el ID
      }

      const handleDeleteClick = (id) => {
        setMedToDelete(id) // Establece el ID del medicamento que se desea eliminar
        setConfirmVisible(true) // Muestra la ventana de confirmación
      }

      const confirmDelete = () => {
        setMeds(meds.filter((med) => med.id !== medToDelete)) // Elimina el medicamento con el ID especificado
        setConfirmVisible(false) // Cierra la ventana de confirmación
        setMedToDelete(null) // Limpia el estado del medicamento a eliminar
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
        <CFormLabel>Name</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search Name"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-md-2">
        <CFormLabel>Dosage</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search Dosage"
          name="dosage"
          value={filters.dosage}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-md-2">
              <CFormLabel>Category</CFormLabel>
              <CFormSelect
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">All Category</option>
                <option value="1">Capsules</option>
                <option value="2">Syrups</option>
              </CFormSelect>
            </div>
    </CForm>
  </CCardBody>
</CCard>

    <div>
    <CCardHeader>
  <CButton style={{margin: '10px'}} color="success" onClick={() => setAddVisible(true)}>
    Add Medication
  </CButton>
  
</CCardHeader>
    </div>
    <CCard className="table-responsive">
        <CCardHeader>List of Medication</CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Dosage</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
   
  {filteredMeds.map((med) => (
    <CTableRow key={med.id}>
      <CTableDataCell>{med.id}</CTableDataCell>
      <CTableDataCell>{med.name}</CTableDataCell>
      <CTableDataCell>{med.dosage}</CTableDataCell>
      <CTableDataCell>{med.category === 1 ? 'Capsules' : 'Syrups'}</CTableDataCell>
      <CTableDataCell>
        <div className='buttom_action'>
        <CButton className='buttom_action_1' color="primary" size="sm" onClick={() => handleEdit(med)}>Edit</CButton>{' '}
        <CButton
  className="buttom_action_2"
  color="danger"
  size="sm"
  onClick={() => handleDeleteClick(med.id)} // Llama a la función para mostrar la modal de confirmación
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
    <CModalTitle>Edit Medication</CModalTitle>
  </CModalHeader>
  <CModalBody>
    {selectedMed && (
      <CForm>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedMed.id}
            disabled
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Name</CFormLabel>
          <CFormInput
            type="text"
            value={selectedMed.name}
            onChange={(e) => setSelectedMed({ ...selectedMed, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Dosage</CFormLabel>
          <CFormInput
            type="text"
            value={selectedMed.dosage}
            onChange={(e) => setSelectedMed({ ...selectedMed, dosage: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Category</CFormLabel>
          <CFormSelect
            value={selectedMed.category}
            onChange={(e) => setSelectedMed({ ...selectedMed, category: parseInt(e.target.value) })}
          >
            <option value={1}>Capsules</option>
            <option value={2}>Syrups</option>
          </CFormSelect>
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
    <CModalTitle>Add New Medication</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CForm>
      <div className="mb-3">
        <CFormLabel>Name</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Name"
          value={newMed.name}
          onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Dosage</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Dosage"
          value={newMed.dosage}
          onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Category</CFormLabel>
        <CFormSelect
          value={newMed.category}
          onChange={(e) => setNewMed({ ...newMed, category: parseInt(e.target.value) })}
        >
          <option value={1}>Capsules</option>
          <option value={2}>Syrups</option>
        </CFormSelect>
      </div>
    </CForm>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setAddVisible(false)}>
      Cancel
    </CButton>
    <CButton color="primary" onClick={() => handleAddMed(newMed)}>
      Add Medication
    </CButton>
  </CModalFooter>
</CModal>


<CModal visible={confirmVisible} onClose={() => setConfirmVisible(false)}>
  <CModalHeader>
    <CModalTitle>Confirm Delete</CModalTitle>
  </CModalHeader>
  <CModalBody>
    Are you sure you want to delete this meditacion? This action cannot be undone.
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

export default MedicationList