import React, { useState } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormInput, CFormSelect, CButton,
    } from '@coreui/react'

    const initialUser = {
    identity_card: '',
    first_name: '',
    last_name: '',
    role_id: 1,
    specialty: '',
    email: '',
    password: '', // <-- Agregado
    }

    const UserAddModal = ({ visible, onClose, specialties = [], onUserAdded }) => {
    const [newUser, setNewUser] = useState(initialUser)
    const [loading, setLoading] = useState(false)

    const handleAdd = async () => {
        setLoading(true)
        try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:4000/user', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newUser),
        })
        if (!response.ok) throw new Error('Error adding user')
        setNewUser(initialUser)
        if (onUserAdded) onUserAdded()
        onClose()
        } catch (err) {
        alert('Error adding user')
        } finally {
        setLoading(false)
        }
    }

    // Reset form when modal opens/closes
    React.useEffect(() => {
        if (!visible) setNewUser(initialUser)
    }, [visible])

    return (
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Add New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <CForm>
            <div className="mb-3">
                <CFormLabel>Identity Card</CFormLabel>
                <CFormInput
                value={newUser.identity_card}
                onChange={(e) => setNewUser({ ...newUser, identity_card: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>First Name</CFormLabel>
                <CFormInput
                value={newUser.first_name}
                onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput
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
                <option value={2}>Doctor</option>
                </CFormSelect>
            </div>
            <div className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Password</CFormLabel>
                <CFormInput
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
            </div>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose} disabled={loading}>Cancel</CButton>
            <CButton color="primary" onClick={handleAdd} disabled={loading}>
            {loading ? 'Adding...' : 'Add User'}
            </CButton>
        </CModalFooter>
        </CModal>
    )
}

export default UserAddModal