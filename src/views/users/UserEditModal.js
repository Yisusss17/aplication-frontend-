import React, { useState, useEffect } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormInput, CFormSelect, CButton, CAlert,
    } from '@coreui/react'

    const UserEditModal = ({ visible, onClose, user, specialties, onUserUpdated }) => {
    const [editUser, setEditUser] = useState(user || {})
    const [error, setError] = useState('')

    useEffect(() => {
        setEditUser(user || {})
        setError('')
    }, [user, visible])

    const handleSave = async () => {
        try {
        const token = localStorage.getItem('token')
        const payload = {
            identity_card: editUser.identity_card,
            first_name: editUser.first_name,
            last_name: editUser.last_name,
            role_id: Number(editUser.role_id),
            specialty: editUser.role_id === 2 ? editUser.specialty : undefined,
            email: editUser.email,
            address: editUser.address,
            phone: editUser.phone,
        }
        const response = await fetch(`http://localhost:4000/user/${editUser.user_id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        })
        const data = await response.json()
        if (!response.ok) {
            setError(data.message || 'Error updating user')
            return
        }
        if (onUserUpdated) onUserUpdated()
        onClose()
        } catch (err) {
        setError('Error updating user')
        }
    }

    if (!editUser) return null

    return (
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Edit User</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && (
            <CAlert color="danger" className="text-center mb-3">
                <strong>{error}</strong>
            </CAlert>
            )}
            <CForm>
            <div className="mb-3">
                <CFormLabel>ID</CFormLabel>
                <CFormInput type="text" value={editUser.id || ''} disabled />
            </div>
            <div className="mb-3">
                <CFormLabel>Identity Card</CFormLabel>
                <CFormInput
                value={editUser.identity_card || ''}
                onChange={(e) => setEditUser({ ...editUser, identity_card: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>First Name</CFormLabel>
                <CFormInput
                value={editUser.first_name || ''}
                onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput
                value={editUser.last_name || ''}
                onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Role</CFormLabel>
                <CFormSelect
                value={editUser.role_id || 1}
                onChange={(e) => setEditUser({ ...editUser, role_id: parseInt(e.target.value) })}
                >
                <option value={2}>Admin</option>
                <option value={1}>Doctor</option>
                </CFormSelect>
            </div>
            
            <div className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                type="email"
                value={editUser.email || ''}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Address</CFormLabel>
                <CFormInput
                    value={editUser.address || ''}
                    onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Phone</CFormLabel>
                <CFormInput
                    value={editUser.phone || ''}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
            </div>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose}>Cancel</CButton>
            <CButton color="primary" onClick={handleSave}>Save Changes</CButton>
        </CModalFooter>
        </CModal>
    )
}

export default UserEditModal