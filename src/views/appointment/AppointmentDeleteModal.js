import React, { useState, useEffect } from 'react'
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CAlert } from '@coreui/react'

const AppointmentDeleteModal = ({ visible, onClose, appointment, onAppointmentDeleted }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [visible])

    const handleDelete = async () => {
        setLoading(true)
        try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:4000/appointments/${appointment?.appointment_id}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            setError(data.message || 'Error deleting appointment')
            return
        }
        onAppointmentDeleted?.()
        onClose()
        } catch (err) {
        setError('Error deleting appointment')
        } finally {
        setLoading(false)
        }
    }

    if (!appointment) return null

    return (
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            Are you sure you want to delete this appointment?
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose} disabled={loading}>Cancel</CButton>
            <CButton color="danger" onClick={handleDelete} disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</CButton>
        </CModalFooter>
        </CModal>
    )
}

export default AppointmentDeleteModal