import React, { useState, useEffect } from 'react'
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CForm,
    CFormLabel,
    CFormInput,
    CButton,
    CAlert,
    } from '@coreui/react'

    const initialPatient = {
    identity_card: '',
    first_name: '',
    last_name: '',
    address: '',
    phone: '',
    email: '',
    birth_date: '',
    }

    const PatientAddModal = ({ visible, onClose, onPatientAdded }) => {
    const [newPatient, setNewPatient] = useState(initialPatient)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!visible) {
        setNewPatient(initialPatient)
        setError('')
        }
    }, [visible])

    const handleAdd = async () => {
        setLoading(true)
        setError('')
        try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:4000/patient', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newPatient),
        })
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message || 'Error adding patient')
        }
        if (onPatientAdded) onPatientAdded()
        onClose()
        } catch (err) {
        setError(err.message || 'Error adding patient')
        } finally {
        setLoading(false)
        }
    }

    return (
        <CModal visible={visible} onClose={onClose} backdrop="static">
        <CModalHeader>
            <CModalTitle>Add New Patient</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            <CForm>
            <div className="mb-3">
                <CFormLabel>Identity Card</CFormLabel>
                <CFormInput
                value={newPatient.identity_card}
                onChange={(e) => setNewPatient({ ...newPatient, identity_card: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>First Name</CFormLabel>
                <CFormInput
                value={newPatient.first_name}
                onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput
                value={newPatient.last_name}
                onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Address</CFormLabel>
                <CFormInput
                value={newPatient.address}
                onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Phone</CFormLabel>
                <CFormInput
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Birth Date</CFormLabel>
                <CFormInput
                type="date"
                value={newPatient.birth_date}
                onChange={(e) => setNewPatient({ ...newPatient, birth_date: e.target.value })}
                />
            </div>
            </CForm>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose} disabled={loading}>Cancel</CButton>
            <CButton color="primary" onClick={handleAdd} disabled={loading}>
            {loading ? 'Adding...' : 'Add Patient'}
            </CButton>
        </CModalFooter>
        </CModal>
    )
}

export default PatientAddModal