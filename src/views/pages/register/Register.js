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
import { cilLockLocked, cilUser, cilPhone, cilHome } from '@coreui/icons'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    identity_card: '',
    first_name: '',
    last_name: '',
    address: '',
    phone: '',
  })

  const [formErrors, setFormErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = () => {
    const errors = {}

    if (!newUser.username.trim()) errors.username = 'Username is required'
    if (!newUser.identity_card.trim()) errors.identity_card = 'ID is required'
    if (!newUser.first_name.trim()) errors.first_name = 'First name is required'
    if (!newUser.last_name.trim()) errors.last_name = 'Last name is required'
    if (!newUser.email.trim()) errors.email = 'Email is required'
    if (!newUser.phone.trim()) errors.phone = 'Phone is required'
    if (!newUser.address.trim()) errors.address = 'Address is required'
    if (!newUser.password) errors.password = 'Password is required'
    if (!newUser.confirmPassword) {
      errors.confirmPassword = 'Please confirm password'
    } else if (newUser.password !== newUser.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    return errors
  }

  const handleCreateAction = async (e) => {
    e.preventDefault()
    const errors = validateForm()
    setFormErrors(errors)

    if (Object.keys(errors).length > 0) return

    try {
      await axios.post('http://localhost:3001/users', newUser)
      setSuccessMessage('User registered successfully!')

      setTimeout(() => {
        setSuccessMessage('')
        navigate('/login')
      }, 3000)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to register user. Please try again.')
    }
  }

  const inputClass = (field) =>
    `rounded-end bg-white ${formErrors[field] ? 'border border-danger' : ''}`

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

                {successMessage && (
                  <div className="alert alert-success text-center slide-up-success" role="alert">
                    {successMessage}
                  </div>
                )}

                <CForm onSubmit={handleCreateAction}>
                  {/* Username */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Username"
                      autoComplete="username"
                      className={inputClass('username')}
                      style={{ color: '#000' }}
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.username && (
                    <div className="text-danger ms-2 mb-2">{formErrors.username}</div>
                  )}

                  {/* Identity Card */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Identity Card"
                      autoComplete="off"
                      className={inputClass('identity_card')}
                      style={{ color: '#000' }}
                      value={newUser.identity_card}
                      onChange={(e) => setNewUser({ ...newUser, identity_card: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.identity_card && (
                    <div className="text-danger ms-2 mb-2">{formErrors.identity_card}</div>
                  )}

                  {/* First Name */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="First Name"
                      autoComplete="off"
                      className={inputClass('first_name')}
                      style={{ color: '#000' }}
                      value={newUser.first_name}
                      onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.first_name && (
                    <div className="text-danger ms-2 mb-2">{formErrors.first_name}</div>
                  )}

                  {/* Last Name */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Last Name"
                      autoComplete="off"
                      className={inputClass('last_name')}
                      style={{ color: '#000' }}
                      value={newUser.last_name}
                      onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.last_name && (
                    <div className="text-danger ms-2 mb-2">{formErrors.last_name}</div>
                  )}

                  {/* Email */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">@</CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      className={inputClass('email')}
                      style={{ color: '#000' }}
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.email && (
                    <div className="text-danger ms-2 mb-2">{formErrors.email}</div>
                  )}

                  {/* Phone */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Phone"
                      autoComplete="tel"
                      className={inputClass('phone')}
                      style={{ color: '#000' }}
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.phone && (
                    <div className="text-danger ms-2 mb-2">{formErrors.phone}</div>
                  )}

                  {/* Address */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Address"
                      autoComplete="street-address"
                      className={inputClass('address')}
                      style={{ color: '#000' }}
                      value={newUser.address}
                      onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.address && (
                    <div className="text-danger ms-2 mb-2">{formErrors.address}</div>
                  )}

                  {/* Password */}
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      className={inputClass('password')}
                      style={{ color: '#000' }}
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.password && (
                    <div className="text-danger ms-2 mb-2">{formErrors.password}</div>
                  )}

                  {/* Confirm Password */}
                  <CInputGroup className="mb-2">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      className={inputClass('confirmPassword')}
                      style={{ color: '#000' }}
                      value={newUser.confirmPassword}
                      onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                    />
                  </CInputGroup>
                  {formErrors.confirmPassword && (
                    <div className="text-danger ms-2 mb-3">{formErrors.confirmPassword}</div>
                  )}

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
