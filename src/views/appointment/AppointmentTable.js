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
const AppointmentList = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, date: '2025-05-29', patient_id: 1, doctor_id: 1, payment_id: 1, status: 'pending' },
        { id: 2, date: '2025-06-10', patient_id: 2, doctor_id: 1, payment_id: 2, status: 'successful' },
    ])
    const [filters, setFilters] = useState({
        id: '',
        date: '',
        patient_id: '',
        doctor_id: '',
        payment_id: '',
        status: '',
    })

    const [newAppointment, setNewAppointment] = useState({
        date: '',
        patient_id: '',
        doctor_id: '',
        payment_id: '',
        status: '',
      })
      const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters({
          ...filters,
          [name]: value,
        })
      }
      const filteredAppointments = appointments.filter((appointment) => {
        return (
          (filters.id === '' || appointment.id.toString().includes(filters.id)) &&
          (filters.date === '' || appointment.date.includes(filters.date)) &&
          (filters.patient_id === '' || appointment.patient_id.toString().includes(filters.patient_id)) &&
          (filters.doctor_id === '' || appointment.doctor_id.toString().includes(filters.doctor_id)) &&
          (filters.payment_id === '' || appointment.payment_id.toString().includes(filters.payment_id)) &&
          (filters.status === '' || appointment.status.toLowerCase().includes(filters.status.toLowerCase()))
        )
      });

      const [visible, setVisible] = useState(false) 
      const [selectedAppointment, setSelectedAppointment] = useState(null)
      const [addVisible, setAddVisible] = useState(false) 
      const [confirmVisible, setConfirmVisible] = useState(false)
      const [appointmentToDelete, setAppointmentToDelete] = useState(null)
      
      const handleEdit = (appointment) => {
        setSelectedAppointment(appointment);
        setVisible(true);
      };

      const handleSave = () => {
        setAppointments(appointments.map((appointment) => (appointment.id === selectedAppointment.id ? selectedAppointment : appointment)));
        setVisible(false);
      };

      const handleAddAppointment = (newAppointment) => {
        setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }]);
        setAddVisible(false);
      };

      const handleDelete = (id) => {
        setAppointments(appointments.filter((appointment) => appointment.id !== id))
      }

      const handleDeleteClick = (id) => {
        setAppointmentToDelete(id);
        setConfirmVisible(true);
      };

      const confirmDelete = () => {
        setAppointments(appointments.filter((appointment) => appointment.id !== appointmentToDelete));
        setConfirmVisible(false);
        setAppointmentToDelete(null);
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
        <CFormLabel>Date</CFormLabel>
        <CFormInput
          type="date"
          placeholder="Search Date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-md-2">
              <CFormLabel>Patient</CFormLabel>
              <CFormSelect
                name="patient_id"
                value={filters.patient_id}
                onChange={handleFilterChange}
              >
                <option value="">All Patient</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
              </CFormSelect>
            </div>
      <div className="col-md-2">
              <CFormLabel>Doctor</CFormLabel>
              <CFormSelect
                name="doctor_id"
                value={filters.doctor_id}
                onChange={handleFilterChange}
              >
                <option value="">All Doctor</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
              </CFormSelect>
            </div>
      <div className="col-md-2">
        <CFormLabel>Payment</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search Payment ID"
          name="payment_id"
          value={filters.payment_id}
          onChange={handleFilterChange}
        />
      </div>
      <div className="col-md-2">
        <CFormLabel>Status</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Search Status"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        />
      </div>
    </CForm>
  </CCardBody>
</CCard>

    <div>
    <CCardHeader>
  <CButton style={{margin: '10px'}} color="success" onClick={() => setAddVisible(true)}>
    Add Appointment
  </CButton>
  
</CCardHeader>
    </div>
    <CCard className="table-responsive">
        <CCardHeader>List of Appointments</CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
                <CTableHeaderCell>Patient ID</CTableHeaderCell>
                <CTableHeaderCell>Doctor ID</CTableHeaderCell>
                <CTableHeaderCell>Payment ID</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
  {filteredAppointments.map((appointment) => (
    <CTableRow key={appointment.id}>
      <CTableDataCell>{appointment.id}</CTableDataCell>
      <CTableDataCell>{appointment.date}</CTableDataCell>
      <CTableDataCell>{appointment.patient_id === 1 ? 'John Doe': 'Jane Smith'}</CTableDataCell>
      <CTableDataCell>{appointment.doctor_id === 1 ? 'John Doe': 'Jane Smith'}</CTableDataCell>
      <CTableDataCell>{appointment.payment_id}</CTableDataCell>
      <CTableDataCell>{appointment.status}</CTableDataCell>
      <CTableDataCell>
        <div className='buttom_action'>
        <CButton className='buttom_action_1' color="primary" size="sm" onClick={() => handleEdit(appointment)}>Edit</CButton>{' '}
        <CButton
  className="buttom_action_2"
  color="danger"
  size="sm"
  onClick={() => handleDeleteClick(appointment.id)}
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
    <CModalTitle>Edit Appointment</CModalTitle>
  </CModalHeader>
  <CModalBody>
    {selectedAppointment && (
      <CForm>
        <div className="mb-3">
          <CFormLabel>ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedAppointment.id}
            disabled
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Date</CFormLabel>
          <CFormInput
            type="date"
            value={selectedAppointment.date}
            onChange={(e) => setSelectedAppointment({ ...selectedAppointment, date: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Patient ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedAppointment.patient_id}
            onChange={(e) => setSelectedAppointment({ ...selectedAppointment, patient_id: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Doctor ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedAppointment.doctor_id}
            onChange={(e) => setSelectedAppointment({ ...selectedAppointment, doctor_id: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Payment ID</CFormLabel>
          <CFormInput
            type="text"
            value={selectedAppointment.payment_id}
            onChange={(e) => setSelectedAppointment({ ...selectedAppointment, payment_id: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <CFormLabel>Status</CFormLabel>
          <CFormInput
            type="text"
            value={selectedAppointment.status}
            onChange={(e) => setSelectedAppointment({ ...selectedAppointment, status: e.target.value })}
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
    <CModalTitle>Add New Appointment</CModalTitle>
  </CModalHeader>
  <CModalBody>
    <CForm>
      <div className="mb-3">
        <CFormLabel>Date</CFormLabel>
        <CFormInput
          type="date"
          placeholder="Enter Date"
          value={newAppointment.date}
          onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Patient ID</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Patient ID"
          value={newAppointment.patient_id}
          onChange={(e) => setNewAppointment({ ...newAppointment, patient_id: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Doctor ID</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Doctor ID"
          value={newAppointment.doctor_id}
          onChange={(e) => setNewAppointment({ ...newAppointment, doctor_id: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Payment ID</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Payment ID"
          value={newAppointment.payment_id}
          onChange={(e) => setNewAppointment({ ...newAppointment, payment_id: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel>Status</CFormLabel>
        <CFormInput
          type="text"
          placeholder="Enter Status"
          value={newAppointment.status}
          onChange={(e) => setNewAppointment({ ...newAppointment, status: e.target.value })}
        />
      </div>
    </CForm>
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setAddVisible(false)}>
      Cancel
    </CButton>
    <CButton color="primary" onClick={() => handleAddAppointment(newAppointment)}>
      Add Appointment
    </CButton>
  </CModalFooter>
</CModal>


<CModal visible={confirmVisible} onClose={() => setConfirmVisible(false)}>
  <CModalHeader>
    <CModalTitle>Confirm Delete</CModalTitle>
  </CModalHeader>
  <CModalBody>
    Are you sure you want to delete this appointment? This action cannot be undone.
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

export default AppointmentList