import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
  CModalTitle
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
      setError('Email and password are required');
      return;
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
    <div className="bg-body-white min-vh-100 d-flex flex-row align-items-center">
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Password Recovery</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Please enter your email address to receive a password recovery link.
          <CInputGroup className="mb-2">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput placeholder="Email" autoComplete="email" />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="info">Send</CButton>
        </CModalFooter>
      </CModal>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary"> Sign in with your details</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {error && <p className="text-danger">{error}</p>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="info" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="info" className="px-0" onClick={() => setVisible(true)}>
                          Forgot your password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CCardBody className="text-center">
                    <p className="text-body-secondary">Are you not registered?</p> 
                      <Link to="/register">
                        <CButton color="info" className="mt-0" active tabIndex={-1} >
                        Register here!
                      </CButton>
                      </Link>
                      </CCardBody>
                  </CForm>
                </CCardBody>
              </CCard>
              
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      
    </div>
  )
}

export default Login
