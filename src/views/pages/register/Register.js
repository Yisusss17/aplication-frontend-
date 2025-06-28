import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleCreateAction = async (e) => {
    e.preventDefault()
    if (newUser.password !== newUser.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      const response = await axios.post('http://localhost:3001/users', newUser)
      console.log('Response data:', response.data)
      navigate('/login')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to register user. Please try again.')
    }
  }

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: 'url("src/assets/images/fondo-login.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="shadow-lg border-0 rounded-5 bg-white bg-opacity-75">
              <CCardBody className="p-5">
                <div className="text-center mb-4">
                  <img
                    src="\src\assets\images\logo_clinica.jpg"
                    alt="Logo Clínica"
                    style={{
                      width: '210px',
                      height: '210px',
                      objectFit: 'cover',
                      borderRadius: '50%',
                      border: '4px solid #0dcaf0',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
                      marginBottom: '18px',
                    }}
                  />
                  <h1 className="fw-bold text-dark mt-3">Create Account</h1>
                  <p className="text-dark fs-5">Join our clinic platform in just a few steps</p>
                </div>
                <CForm onSubmit={handleCreateAction}>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      className="rounded-end bg-white"
                      style={{ color: '#000', '::placeholder': { color: '#000' } }}
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText className="bg-light text-dark rounded-start">@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      className="rounded-end bg-white"
                      style={{ color: '#000', '::placeholder': { color: '#000' } }}
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      className="rounded-end bg-white"
                      style={{ color: '#000', '::placeholder': { color: '#000' } }}
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      className="rounded-end bg-white"
                      style={{ color: '#000', '::placeholder': { color: '#000' } }}
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                      required
                    />
                  </CInputGroup>

                  <div className="d-grid gap-3 mb-2">
                    <CButton
                      type="submit"
                      color="info"
                      size="lg"
                      className="fw-bold text-white rounded-pill shadow-sm"
                    >
                      Create Account
                    </CButton>
                  </div>
                  <div className="text-center">
                    <Link to="/login" className="text-decoration-none">
                      <CButton
                        color="danger"
                        className="text-white fw-semibold rounded-pill px-4"
                      >
                        Cancel
                      </CButton>
                    </Link>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
