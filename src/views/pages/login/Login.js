import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          email,
          password,
        },
      })

      if (response.data.length > 0) {
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch (err) {
      console.error(err)
      setError('An error occurred while logging in')
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
      <CModal
  alignment="center"
  visible={visible}
  onClose={() => setVisible(false)}
  className="rounded-4"
>
  <CModalHeader className="bg-info text-white rounded-top">
    <CModalTitle className="fw-bold">🔒 Password Recovery</CModalTitle>
  </CModalHeader>

  <CModalBody className="bg-white bg-opacity-75">
    <p className="mb-3 text-dark">
      Please enter your email address to receive a password recovery link.
    </p>
    <CInputGroup>
      <CInputGroupText className="bg-light text-dark">@</CInputGroupText>
      <CFormInput
        placeholder="Enter your email"
        autoComplete="email"
        className="bg-white text-dark"
      />
    </CInputGroup>
  </CModalBody>

  <CModalFooter className="bg-white bg-opacity-75 rounded-bottom">
    <CButton
      color="light"
      className="border border-secondary text-dark rounded-pill px-4"
      onClick={() => setVisible(false)}
    >
      Close
    </CButton>
    <CButton
      color="info"
      className="text-white rounded-pill px-4 fw-semibold"
    >
      Send
    </CButton>
  </CModalFooter>
</CModal>


      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="shadow-lg border-0 rounded-5 bg-white bg-opacity-75">
              <CCardBody className="p-5">
                <div className="text-center mb-4">
                  <img
                    src="/src/assets/images/logo_clinica.jpg"
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
                  <h1 className="fw-bold text-dark mt-3">Login</h1>
                  <p className="text-dark fs-5">Sign in with your registered account</p>
                </div>
                <CForm>
                  <CInputGroup className="mb-3">
                    <CInputGroupText className="bg-light text-dark rounded-start">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      placeholder="Email"
                      autoComplete="username"
                      className="rounded-end bg-white"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      autoComplete="current-password"
                      className="rounded-end bg-white"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </CInputGroup>

                  {error && <p className="text-danger text-center">{error}</p>}

                  <div className="d-grid gap-3 mb-2">
                    <CButton
                      type="button"
                      color="info"
                      size="lg"
                      className="fw-bold text-white rounded-pill shadow-sm"
                      onClick={handleLogin}
                    >
                      Login
                    </CButton>
                  </div>
                  <div className="text-center mb-3">
                    <CButton
                      color="light"
                      className="border border-info text-info rounded-pill px-4"
                      onClick={() => setVisible(true)}
                    >
                      Forgot your password?
                    </CButton>
                  </div>

                  <div className="text-center">
                    <p className="text-dark">Don't have an account?</p>
                    <Link to="/register" className="text-decoration-none">
                      <CButton
                        color="success"
                        className="text-white fw-semibold rounded-pill px-4"
                      >
                        Register Here
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

export default Login
