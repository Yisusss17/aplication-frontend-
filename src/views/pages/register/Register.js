import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
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
    role_id: 1,
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
      const payload = {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        identity_card: newUser.identity_card,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        address: newUser.address,
        phone: newUser.phone,
        role_id: 1,
      }

      const response = await axios.post('http://localhost:4000/api/auth/register', payload)

      if (response.status === 201 || response.data?.message?.includes('registrado')) {
        setSuccessMessage('User registered successfully!')
        setTimeout(() => {
          setSuccessMessage('')
          navigate('/login')
        }, 3000)
      } else {
        setSuccessMessage('')
        setFormErrors({ general: 'Registration failed. Please try again.' })
      }
    } catch (error) {
      setSuccessMessage('')
      setFormErrors({
        general:
          error.response?.data?.message ||
          'Failed to register user. Please check your data or try again.',
      })
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
                  <CAlert color="success" className="slide-up-success text-center mb-3">
                    {successMessage}
                  </CAlert>
                )}
                {formErrors.general && (
                  <CAlert color="danger" className="text-center mb-3">
                    <strong>{formErrors.general}</strong>
                  </CAlert>
                )}

                <CForm onSubmit={handleCreateAction}>
                  {/* Username */}
                  <CFormLabel htmlFor="username" className="fw-semibold text-dark">
                    Username
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="username"
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
                  <CFormLabel htmlFor="identity_card" className="fw-semibold text-dark">
                    Identity Card
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="identity_card"
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
                  <CFormLabel htmlFor="first_name" className="fw-semibold text-dark">
                    First Name
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="first_name"
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
                  <CFormLabel htmlFor="last_name" className="fw-semibold text-dark">
                    Last Name
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      id="last_name"
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
                  <CFormLabel htmlFor="email" className="fw-semibold text-dark">
                    Email
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">@</CInputGroupText>
                    <CFormInput
                      id="email"
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
                  <CFormLabel htmlFor="phone" className="fw-semibold text-dark">
                    Phone
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      id="phone"
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
                  <CFormLabel htmlFor="address" className="fw-semibold text-dark">
                    Address
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilHome} />
                    </CInputGroupText>
                    <CFormInput
                      id="address"
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
                  <CFormLabel htmlFor="password" className="fw-semibold text-dark">
                    Password
                  </CFormLabel>
                  <CInputGroup className="mb-1">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="password"
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
                  <CFormLabel htmlFor="confirmPassword" className="fw-semibold text-dark">
                    Confirm Password
                  </CFormLabel>
                  <CInputGroup className="mb-2">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                      className={inputClass('confirmPassword')}
                      style={{ color: '#000' }}
                      value={newUser.confirmPassword}
                      onChange={(e) =>
                        setNewUser({ ...newUser, confirmPassword: e.target.value })
                      }
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
                      <CButton color="danger" className="text-white fw-semibold rounded-pill px-4">
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
      <style>
        {`
        .slide-up-success {
          animation: slideUpFade 0.7s cubic-bezier(0.23, 1, 0.32, 1);
          position: fixed;
          left: 50%;
          bottom: 40px;
          transform: translateX(-50%);
          z-index: 9999;
          min-width: 320px;
          max-width: 90vw;
        }
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>
      <style>
        {`
          .register-dark-placeholder input::placeholder,
          .register-dark-placeholder input::-webkit-input-placeholder,
          .register-dark-placeholder input::-moz-placeholder,
          .register-dark-placeholder input:-ms-input-placeholder,
          .register-dark-placeholder input::-ms-input-placeholder,
          .register-dark-placeholder input::-o-placeholder {
            color: #000 !important;
            opacity: 1 !important;
          }
        `}
      </style>
    </div>
  )
}

export default Register