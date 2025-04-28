import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAvatar,
} from '@coreui/react'
import { cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import "src/scss/user.scss"
import avatar8 from './../../assets/images/avatars/8.jpg'

const ProfiledPage = () => {
  const [visible, setVisible] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    role: 'Admin',
    status: 'Active',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({ ...profileData, [name]: value })
  }

  return (
    <CRow className="justify-content-center">
      <CCol md={6}>
        <CCard className="mb-4">
          <CCardHeader className="text-center">
            <CAvatar
              src={avatar8}
              size="xl"
              className="mb-3"
            />
            <h5>{profileData.name}</h5>
            <p className="text-muted">{profileData.email}</p>
          </CCardHeader>
          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel>Name</CFormLabel>
                <CFormInput
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel>Role</CFormLabel>
                <CFormSelect
                  name="role"
                  value={profileData.role}
                  onChange={handleInputChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Doctor">Doctor</option>
                </CFormSelect>
              </div>
              <div className="mb-3">
                <CFormLabel>Status</CFormLabel>
                <CFormSelect
                  name="status"
                  value={profileData.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </CFormSelect>
              </div>
              <div className="text-center">
                <CButton color="info" onClick={() => setVisible(true)}>
                  Save Changes
                </CButton>
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Confirmation Modal */}
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Changes</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Are you sure you want to save the changes to your profile?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancel
          </CButton>
          <CButton color="info" onClick={() => setVisible(false)}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </CRow>
  )
}

export default ProfiledPage