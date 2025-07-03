import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'

const PatientTable = ({ patients, onEdit, onDelete }) => {
  // Función para formatear la fecha a DD/MM/YYYY
  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (isNaN(date)) return dateStr // fallback si no es fecha válida
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Identity Card</CTableHeaderCell>
          <CTableHeaderCell>First Name</CTableHeaderCell>
          <CTableHeaderCell>Last Name</CTableHeaderCell>
          <CTableHeaderCell>Birth Date</CTableHeaderCell>
          <CTableHeaderCell>Address</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {patients.map((p) => (
          <CTableRow key={p.id}>
            <CTableDataCell>{p.identity_card}</CTableDataCell>
            <CTableDataCell>{p.first_name}</CTableDataCell>
            <CTableDataCell>{p.last_name}</CTableDataCell>
            <CTableDataCell>{formatDate(p.birth_date)}</CTableDataCell>
            <CTableDataCell>{p.address}</CTableDataCell>
            <CTableDataCell>
              <CButton color="primary" size="sm" onClick={() => onEdit(p)}>
                Edit
              </CButton>{' '}
              <CButton color="danger" size="sm" onClick={() => onDelete(p)}>
                Delete
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default PatientTable