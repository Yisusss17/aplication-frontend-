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
    CAlert
    } from '@coreui/react'

    const PatientEditModal = ({ visible, onClose, patient, onPatientUpdated }) => {
    const [editPatient, setEditPatient] = useState(patient || {})
    const [error, setError] = useState('')

    useEffect(() => {
        setEditPatient(patient || {})
        setError('')
    }, [patient, visible])

    const handleSave = async () => {
        try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:4000/patient/${editPatient.patient_id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editPatient),
        })
        const data = await response.json()
        if (!response.ok) {
            setError(data.message || 'Error updating patient')
            return
        }
        if (onPatientUpdated) onPatientUpdated()
        onClose()
        } catch (err) {
        setError('Error updating patient')
        }
    }

    if (!editPatient) return null

    return (
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Edit Patient</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && <CAlert color="danger" className="text-center mb-3">{error}</CAlert>}
            <CForm>
            <div className="mb-3">
                <CFormLabel>Identity Card</CFormLabel>
                <CFormInput
                value={editPatient.identity_card || ''}
                onChange={(e) => setEditPatient({ ...editPatient, identity_card: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>First Name</CFormLabel>
                <CFormInput
                value={editPatient.first_name || ''}
                onChange={(e) => setEditPatient({ ...editPatient, first_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Last Name</CFormLabel>
                <CFormInput
                value={editPatient.last_name || ''}
                onChange={(e) => setEditPatient({ ...editPatient, last_name: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Address</CFormLabel>
                <CFormInput
                value={editPatient.address || ''}
                onChange={(e) => setEditPatient({ ...editPatient, address: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Phone</CFormLabel>
                <CFormInput
                value={editPatient.phone || ''}
                onChange={(e) => setEditPatient({ ...editPatient, phone: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Birth Date</CFormLabel>
                <CFormInput
                type="date"
                value={editPatient.birth_date || ''}
                onChange={(e) => setEditPatient({ ...editPatient, birth_date: e.target.value })}
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

export default PatientEditModal