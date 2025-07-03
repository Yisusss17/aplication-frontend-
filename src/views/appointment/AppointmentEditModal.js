import React, { useState, useEffect } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormInput, CFormSelect, CButton, CAlert,
    } from '@coreui/react'

    const AppointmentEditModal = ({
    visible,
    onClose,
    appointment,
    patients = [],
    doctors = [],
    payments = [],
    medications = [],
    onAppointmentUpdated,
    }) => {
    const [editAppointment, setEditAppointment] = useState(appointment || {})
    const [error, setError] = useState('')

    useEffect(() => {
        setEditAppointment(appointment || {})
        setError('')
    }, [appointment, visible])

    const handleSave = async () => {
        try {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:4000/appointments/${editAppointment.appointment_id}`, {
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editAppointment),
        })
        const data = await response.json()
        if (!response.ok) {
            setError(data.message || 'Error updating appointment')
            return
        }
        onAppointmentUpdated?.()
        onClose()
        } catch (err) {
        setError('Error updating appointment')
        }
    }

    if (!editAppointment) return null

    return (
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Edit Appointment</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && <CAlert color="danger">{error}</CAlert>}
            <CForm>
            <div className="mb-3">
                <CFormLabel>Date</CFormLabel>
                <CFormInput
                type="datetime-local"
                value={editAppointment.date || ''}
                onChange={(e) => setEditAppointment({ ...editAppointment, date: e.target.value })}
                />
            </div>
            <div className="mb-3">
                <CFormLabel>Patient</CFormLabel>
                <CFormSelect
                value={editAppointment.patient_id || ''}
                onChange={(e) => setEditAppointment({ ...editAppointment, patient_id: parseInt(e.target.value) || '' })}
                >
                <option value="">Select Patient</option>
                {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.first_name} {p.last_name}</option>
                ))}
                </CFormSelect>
            </div>
            <div className="mb-3">
                <CFormLabel>Doctor</CFormLabel>
                <CFormSelect
                value={editAppointment.doctor_id || ''}
                onChange={(e) => setEditAppointment({ ...editAppointment, doctor_id: parseInt(e.target.value) || '' })}
                >
                <option value="">Select Doctor</option>
                {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.first_name} {d.last_name}</option>
                ))}
                </CFormSelect>
            </div>
            <div className="mb-3">
                <CFormLabel>Payment</CFormLabel>
                <CFormSelect
                value={editAppointment.payment_id || ''}
                onChange={(e) => setEditAppointment({ ...editAppointment, payment_id: parseInt(e.target.value) || '' })}
                >
                <option value="">Select Payment</option>
                {payments.map(p => (
                    <option key={p.id} value={p.id}>Payment #{p.id}</option>
                ))}
                </CFormSelect>
            </div>
            <div className="mb-3">
                <CFormLabel>Status</CFormLabel>
                <CFormSelect
                value={editAppointment.status || 'pending'}
                onChange={(e) => setEditAppointment({ ...editAppointment, status: e.target.value })}
                >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                </CFormSelect>
            </div>
            <div className="mb-3">
                <CFormLabel>Medication (Optional)</CFormLabel>
                <CFormSelect
                value={editAppointment.medication_id || ''}
                onChange={(e) => setEditAppointment({ ...editAppointment, medication_id: e.target.value ? parseInt(e.target.value) : '' })}
                >
                <option value="">None</option>
                {medications.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                ))}
                </CFormSelect>
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

export default AppointmentEditModal