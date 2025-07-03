import React, { useState, useEffect } from 'react'
import {
    CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton, CAlert
    } from '@coreui/react'

    const UserDeleteModal = ({ visible, onClose, user, onUserDeleted }) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        setError('')
    }, [user, visible])

    const handleDelete = async () => {
        setLoading(true)
        setError('')
        try {
        const token = localStorage.getItem('token')
        const userId = user.user_id
        console.log('Eliminando usuario:', user);
        console.log('ID enviado:', user.user_id);
        const response = await fetch(`http://localhost:4000/user/${userId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })
        const data = await response.json()
        if (!response.ok) {
            // Manejo especial para error de clave foránea
            if (data.message && data.message.includes('Foreign key constraint')) {
            setError('No se puede eliminar el usuario porque tiene datos relacionados en el sistema.')
            } else {
            setError(data.message || 'Error deleting user')
            }
            setLoading(false)
            return
        }
        if (onUserDeleted) onUserDeleted()
        onClose()
        } catch (err) {
        setError('Error deleting user')
        } finally {
        setLoading(false)
        }
    }

    if (!user) return null

    return (
        <CModal visible={visible} onClose={onClose}>
        <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody>
            {error && (
            <CAlert color="danger" className="text-center mb-3">
                <strong>{error}</strong>
            </CAlert>
            )}
            Are you sure you want to delete this user? This action cannot be undone.
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" onClick={onClose} disabled={loading}>Cancel</CButton>
            <CButton color="danger" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
            </CButton>
        </CModalFooter>
        </CModal>
    )
}

export default UserDeleteModal