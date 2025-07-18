import React, { useState, useEffect } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter,
    CForm, CFormLabel, CFormInput, CFormSelect, CButton, CAlert,
} from '@coreui/react'

const AppointmentAddModal = ({
    visible,
    onClose,
    patients: initialPatients = [],
    doctors: initialDoctors = [], // Renombrar la prop para evitar conflicto
    payments = [],
    medications = [],
    onAppointmentAdded,
}) => {
    const [appointment, setAppointment] = useState({
        date: '',
        patient_id: '',
        doctor_id: '',
        payment_id: '',
        status: 'pending',
        medication_id: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [roleId, setRoleId] = useState(null)
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([]) // Estado local para doctores

    // Detectar el role_id del usuario actual
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'))
            setRoleId(userData?.user?.role_id ?? null)
        } catch {
            setRoleId(null)
        }
    }, [visible])

    // Cargar pacientes desde la API cuando el modal se abre
    useEffect(() => {
        if (visible) {
            const fetchPatientsAndDoctors = async () => {
                try {
                    const token = localStorage.getItem('token')
                    // Pacientes
                    const resPatients = await fetch('http://localhost:4000/patient', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    const dataPatients = await resPatients.json()
                    if (Array.isArray(dataPatients)) setPatients(dataPatients)
                    else if (Array.isArray(dataPatients.patients)) setPatients(dataPatients.patients)
                    else if (Array.isArray(dataPatients.data)) setPatients(dataPatients.data)
                    else setPatients([])

                    // Doctores (role_id = 1 usualmente es doctor, pero ajusta si tu backend usa otro valor)
                    const resDoctors = await fetch('http://localhost:4000/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                    const dataDoctors = await resDoctors.json()
                    let doctorsArr = []
                    if (Array.isArray(dataDoctors)) doctorsArr = dataDoctors
                    else if (Array.isArray(dataDoctors.users)) doctorsArr = dataDoctors.users
                    else if (Array.isArray(dataDoctors.data)) doctorsArr = dataDoctors.data
                    // Filtrar solo doctores (role_id === 1)
                    setDoctors(doctorsArr.filter(u => u.role_id === 1))
                } catch {
                    setPatients([])
                    setDoctors([])
                }
            }
            fetchPatientsAndDoctors()
        }
    }, [visible])

    useEffect(() => {
        if (!visible) {
            setAppointment({
                date: '',
                patient_id: '',
                doctor_id: '',
                payment_id: '',
                status: 'pending',
                medication_id: '',
            })
            setError('')
        }
    }, [visible])

    const handleAdd = async () => {
        setLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:4000/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(appointment),
            })
            const data = await response.json()
            if (!response.ok) {
                setError(data.message || 'Error adding appointment')
                setLoading(false)
                return
            }
            onAppointmentAdded?.()
            onClose()
        } catch (err) {
            setError('Error adding appointment')
        } finally {
            setLoading(false)
        }
    }

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>Add Appointment</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {error && <CAlert color="danger">{error}</CAlert>}
                <CForm>
                    <div className="mb-3">
                        <CFormLabel>Date</CFormLabel>
                        <CFormInput
                            type="datetime-local"
                            value={appointment.date}
                            onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Patient</CFormLabel>
                        <CFormSelect
                            value={appointment.patient_id}
                            onChange={(e) => setAppointment({ ...appointment, patient_id: parseInt(e.target.value) || '' })}
                        >
                            <option value="">Select Patient</option>
                            {patients.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.first_name} {p.last_name}
                                </option>
                            ))}
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Doctor</CFormLabel>
                        <CFormSelect
                            value={appointment.doctor_id}
                            onChange={(e) => setAppointment({ ...appointment, doctor_id: parseInt(e.target.value) || '' })}
                        >
                            <option value="">Select Doctor</option>
                            {doctors.map(d => (
                                <option key={d.user_id || d.id} value={d.user_id || d.id}>
                                    {d.first_name} {d.last_name}
                                </option>
                            ))}
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Payment</CFormLabel>
                        <CFormSelect
                            value={appointment.payment_id}
                            onChange={(e) => setAppointment({ ...appointment, payment_id: parseInt(e.target.value) || '' })}
                        >
                            <option value="">Select Payment</option>
                            {payments.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.amount ? `$${p.amount} - Payment #${p.id}` : `Payment #${p.id}`}
                                </option>
                            ))}
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Status</CFormLabel>
                        <CFormSelect
                            value={appointment.status}
                            onChange={(e) => setAppointment({ ...appointment, status: e.target.value })}
                        >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                        </CFormSelect>
                    </div>
                    <div className="mb-3">
                        <CFormLabel>Medication (Optional)</CFormLabel>
                        <CFormSelect
                            value={appointment.medication_id || ''}
                            onChange={(e) => setAppointment({ ...appointment, medication_id: e.target.value ? parseInt(e.target.value) : '' })}
                        >
                            <option value="">None</option>
                            {medications.map(m => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </CFormSelect>
                    </div>
                    {/* Mostrar el role_id detectado (solo para depuración, puedes quitarlo si no lo necesitas) */}
                    <div className="mb-3">
                        <small className="text-muted">Usuario role_id detectado: {roleId ?? 'No definido'}</small>
                    </div>
                </CForm>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={onClose} disabled={loading}>
                    Cancel
                </CButton>
                <CButton color="primary" onClick={handleAdd} disabled={loading}>
                    {loading ? 'Adding...' : 'Add Appointment'}
                </CButton>
            </CModalFooter>
        </CModal>
    )
}

export default AppointmentAddModal