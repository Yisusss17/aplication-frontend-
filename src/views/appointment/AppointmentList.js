// src/views/appointments/AppointmentList.js
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
    } from '@coreui/react'
    import AppointmentTable from './AppointmentTable'
    import AppointmentAddModal from './AppointmentAddModal'
    import AppointmentEditModal from './AppointmentEditModal'
    import AppointmentDeleteModal from './AppointmentDeleteModal'

    const AppointmentList = () => {
    const [appointments, setAppointments] = useState([])
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [filters, setFilters] = useState({
  date: '',
  status: '',
  patient_name: '',
  doctor_name: '',
})

    const fetchAppointments = async () => {
        setLoading(true)
        setError(null)
        try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:4000/appointments', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        if (!response.ok) throw new Error(`Error: ${response.status}`)
        const data = await response.json()
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setAppointments(sorted)
        } catch (err) {
        setError('Error fetching appointments: ' + err.message)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchAppointments()
    }, [])

    useEffect(() => {
      fetch('http://localhost:4000/user')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setUsers(data)
          else if (Array.isArray(data.users)) setUsers(data.users)
          else if (Array.isArray(data.data)) setUsers(data.data)
          else setUsers([])
        })
        .catch(() => setUsers([]))
    }, [])

    const handleEdit = (appointment) => {
        setSelectedAppointment(appointment)
        setShowEditModal(true)
    }

    const handleDelete = (appointment) => {
        setSelectedAppointment(appointment)
        setShowDeleteModal(true)
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({
        ...prev,
        [name]: value,
        }))
    }

    const filteredAppointments = appointments.filter((a) =>
  (!filters.date || (a.date && a.date.includes(filters.date))) &&
  (!filters.status || (a.status && a.status.includes(filters.status))) &&
  (!filters.patient_name ||
    (
      (a.patient && (
        a.patient.first_name?.toLowerCase().includes(filters.patient_name.toLowerCase()) ||
        a.patient.last_name?.toLowerCase().includes(filters.patient_name.toLowerCase())
      ))
    )
  ) &&
  (!filters.doctor_name ||
    (
      (a.doctor && Array.isArray(users) && (() => {
        const user = users.find(u => u.user_id === a.doctor.user_id)
        if (!user) return false
        return (
          user.first_name?.toLowerCase().includes(filters.doctor_name.toLowerCase()) ||
          user.last_name?.toLowerCase().includes(filters.doctor_name.toLowerCase())
        )
      })())
    )
  )
)

    return (
        <CRow>
    <CCol>
      <CCard className="mb-3">
        <CCardHeader>Appointment Filters</CCardHeader>
        <CCardBody>
          <CForm className="row g-3">
            <div className="col-md-2">
              <CFormLabel>Date</CFormLabel>
              <CFormInput type="date" name="date" value={filters.date} onChange={handleFilterChange} />
            </div>
            <div className="col-md-2">
              <CFormLabel>Status</CFormLabel>
              <CFormInput type="text" name="status" value={filters.status} onChange={handleFilterChange} />
            </div>
            <div className="col-md-4">
              <CFormLabel>Patient Name</CFormLabel>
              <CFormInput
                type="text"
                name="patient_name"
                placeholder="First or Last Name"
                value={filters.patient_name}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <CFormLabel>Doctor Name</CFormLabel>
              <CFormInput
                type="text"
                name="doctor_name"
                placeholder="First or Last Name"
                value={filters.doctor_name}
                onChange={handleFilterChange}
              />
            </div>
          </CForm>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <strong>Appointment List</strong>
          <div className="float-end d-flex gap-2">
            <CButton color="success" size="sm" onClick={() => setShowAddModal(true)}>
              + Add Appointment
            </CButton>
            <CButton color="info" size="sm" onClick={fetchAppointments}>
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
          {!loading && !error && filteredAppointments.length > 0 && (
            <AppointmentTable appointments={filteredAppointments} onEdit={handleEdit} onDelete={handleDelete} />
          )}
          {!loading && !error && filteredAppointments.length === 0 && (
            <p className="text-center">No appointments found.</p>
          )}
        </CCardBody>
      </CCard>

      {/* Modals */}
      <AppointmentAddModal
        visible={showAddModal}
        onClose={() => {
          setShowAddModal(false)
          fetchAppointments()
        }}
      />

      <AppointmentEditModal
        visible={showEditModal}
        appointment={selectedAppointment}
        onClose={() => {
          setShowEditModal(false)
          fetchAppointments()
        }}
      />

      <AppointmentDeleteModal
        visible={showDeleteModal}
        appointment={selectedAppointment}
        onClose={() => {
          setShowDeleteModal(false)
          fetchAppointments()
        }}
      />
    </CCol>
  </CRow>
    )
}

export default AppointmentList