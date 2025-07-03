// src/views/patients/PatientList.js
import React, { useState, useEffect } from 'react'
import {
    CRow, CCol, CCard, CCardHeader, CCardBody, CButton,
    CForm, CFormInput, CFormLabel, CAlert, CSpinner,
    } from '@coreui/react'
    import PatientTable from './PatientTable'
    import PatientAddModal from './PatientAddModal'
    import PatientEditModal from './PatientEditModal'
    import PatientDeleteModal from './PatientDeleteModal'

    const PatientList = () => {
    const [patients, setPatients] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const [filters, setFilters] = useState({
        identity_card: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        address: '',
    })

    const fetchPatients = async () => {
        setLoading(true)
        setError(null)
        try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:4000/patient', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || 'Error fetching patients')
        setPatients(data)
        } catch (err) {
        setError(err.message)
        } finally {
        setLoading(false)
        }
    }

    useEffect(() => {
        fetchPatients()
        // eslint-disable-next-line
    }, [])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters((prev) => ({ ...prev, [name]: value }))
    }

    const filteredPatients = patients.filter((p) => {
      const patientDate = p.birth_date ? new Date(p.birth_date).toISOString().slice(0, 10) : ''
      return (
        (!filters.identity_card || p.identity_card?.toLowerCase().includes(filters.identity_card.toLowerCase())) &&
        (!filters.first_name || p.first_name?.toLowerCase().includes(filters.first_name.toLowerCase())) &&
        (!filters.last_name || p.last_name?.toLowerCase().includes(filters.last_name.toLowerCase())) &&
        (!filters.birth_date || patientDate === filters.birth_date) &&
        (!filters.address || p.address?.toLowerCase().includes(filters.address.toLowerCase()))
      )
    })

    return (
        <CRow>
        <CCol>
            <CCard className="mb-3">
            <CCardHeader>Patient Filters</CCardHeader>
            <CCardBody>
                <CForm className="row g-3">
                <div className="col-md-2">
                    <CFormLabel>Identity Card</CFormLabel>
                    <CFormInput name="identity_card" value={filters.identity_card} onChange={handleFilterChange} />
                </div>
                <div className="col-md-2">
                    <CFormLabel>First Name</CFormLabel>
                    <CFormInput name="first_name" value={filters.first_name} onChange={handleFilterChange} />
                </div>
                <div className="col-md-2">
                    <CFormLabel>Last Name</CFormLabel>
                    <CFormInput name="last_name" value={filters.last_name} onChange={handleFilterChange} />
                </div>
                <div className="col-md-2">
                    <CFormLabel>Birth Date</CFormLabel>
                    <CFormInput type="date" name="birth_date" value={filters.birth_date} onChange={handleFilterChange} />
                </div>
                <div className="col-md-2">
                    <CFormLabel>Address</CFormLabel>
                    <CFormInput name="address" value={filters.address} onChange={handleFilterChange} />
                </div>
                </CForm>
            </CCardBody>
            </CCard>

            <CCard>
            <CCardHeader>
                Patient List
                <div className="float-end d-flex gap-2">
                <CButton size="sm" color="success" onClick={() => setShowAddModal(true)}>+ Add</CButton>
                <CButton size="sm" color="info" onClick={fetchPatients}>Refresh</CButton>
                </div>
            </CCardHeader>
            <CCardBody>
                {loading && <CSpinner />}
                {error && <CAlert color="danger">{error}</CAlert>}
                {!loading && !error && (
                <PatientTable
                    patients={filteredPatients}
                    onEdit={(p) => { setSelectedPatient(p); setShowEditModal(true) }}
                    onDelete={(p) => { setSelectedPatient(p); setShowDeleteModal(true) }}
                />
                )}
            </CCardBody>
            </CCard>
        </CCol>

        {/* Modales */}
        <PatientAddModal visible={showAddModal} onClose={() => { setShowAddModal(false); fetchPatients() }} />
        <PatientEditModal patient={selectedPatient} visible={showEditModal} onClose={() => { setShowEditModal(false); fetchPatients() }} />
        <PatientDeleteModal patient={selectedPatient} visible={showDeleteModal} onClose={() => { setShowDeleteModal(false); fetchPatients() }} />
        </CRow>
    )
}

export default PatientList