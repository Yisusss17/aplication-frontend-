// src/views/users/UserTable.js
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

    const UserTable = ({ users, onEdit, onDelete }) => {
    return (
        <CTable hover responsive>
        <CTableHead>
            <CTableRow>
            <CTableHeaderCell>Identity Card</CTableHeaderCell>
            <CTableHeaderCell>First Name</CTableHeaderCell>
            <CTableHeaderCell>Last Name</CTableHeaderCell>
            <CTableHeaderCell>Role</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {users.map((user) => (
            <CTableRow key={user.id}>
                <CTableDataCell>{user.identity_card}</CTableDataCell>
                <CTableDataCell>{user.first_name}</CTableDataCell>
                <CTableDataCell>{user.last_name}</CTableDataCell>
                <CTableDataCell>{user.role_id === 1 ? 'Doctor' : 'Admin'}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                {/* <CTableDataCell>{user.role_id === 2 ? user.specialty || 'N/A' : '-'}</CTableDataCell> */}
                <CTableDataCell>
                <CButton color="primary" size="sm" onClick={() => onEdit(user)}>
                    Edit
                </CButton>{' '}
                <CButton color="danger" size="sm" onClick={() => onDelete(user)}>
                  Delete
                </CButton>
                </CTableDataCell>
            </CTableRow>
            ))}
        </CTableBody>
        </CTable>
    )
    }

    export default UserTable