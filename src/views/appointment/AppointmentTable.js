import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

const AppointmentTable = ({ appointments, onEdit, onDelete, users: propUsers }) => {
  const [users, setUsers] = useState(propUsers || [])

  useEffect(() => {
    if (propUsers && propUsers.length > 0) {
      setUsers(propUsers)
    } else {
      // Cambia la URL por la de tu API real de usuarios
      fetch('http://localhost:4000/user')
        .then(res => res.json())
        .then(data => {
          // Si la respuesta es { users: [...] }
          if (Array.isArray(data)) {
            setUsers(data)
          } else if (Array.isArray(data.users)) {
            setUsers(data.users)
          } else if (Array.isArray(data.data)) {
            setUsers(data.data)
          } else {
            setUsers([])
          }
        })
        .catch(() => setUsers([]))
    }
  }, [propUsers])

  // Función para buscar el usuario por user_id
  const getDoctorName = (doctor) => {
    if (doctor?.doctor_id && Array.isArray(users)) {
      const user = users.find(u => u.user_id === doctor.user_id)
      if (user) {
        return `${user.first_name} ${user.last_name}`
      }
    }
    return 'N/A'
  }

  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          
          <CTableHeaderCell>Date</CTableHeaderCell>
          <CTableHeaderCell>Patient</CTableHeaderCell>
          <CTableHeaderCell>Doctor</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {appointments.map((appt) => (
          <CTableRow key={appt.appointment_id}>
          
            <CTableDataCell>
              {new Date(appt.date).toLocaleDateString()}
            </CTableDataCell>
            <CTableDataCell>
              {appt.patient?.first_name} {appt.patient?.last_name}
            </CTableDataCell>
            <CTableDataCell>
              {getDoctorName(appt.doctor)}
            </CTableDataCell>
            <CTableDataCell>{appt.status}</CTableDataCell>
            <CTableDataCell>
              <CButton color="primary" size="sm" onClick={() => onEdit(appt)}>
                Edit
              </CButton>{' '}
              <CButton color="danger" size="sm" onClick={() => onDelete(appt.appointment_id)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default AppointmentTable

