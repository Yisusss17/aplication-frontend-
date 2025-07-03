import React, { useState, useEffect } from 'react'
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CAlert,
    } from '@coreui/react'

    const PatientDeleteModal = ({ visible, onClose, patient, onPatientDeleted }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [patient, visible])

    const handleDelete = async () => {
        setLoading(true)
        setError('')
        try {
        const token = localStorage.getItem('token')
        const patientId = patient?.patient_id || patient?.id
        const response = await fetch(`http://localhost:4000/patient/${patientId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            setError(data.message || 'Error deleting patient')
            setLoading(false)
            return
        }
        if (onPatientDeleted) onPatientDeleted()
        onClose()
        } catch (err) {
        setError('Error deleting patient')
        } finally {
        setLoading(false)
        }
    }

    if (!patient) return null

    return (
        <CModal visible={visible} onClose={onClose} backdrop="static">
        <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && (
            <CAlert color="danger" className="text-center mb-3">
                <strong>{error}</strong>
            </CAlert>
            )}
            Are you sure you want to delete this patient? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose} disabled={loading}>
            Cancel
            </CButton>
            <CButton color="danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
            </CButton>
        </CModalFooter>
        </CModal>
    )
}

export default PatientDeleteModal