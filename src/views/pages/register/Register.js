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
  const navigate = useNavigate();
  const [newUser, setNewUser]=useState({
    username:'',
    email:'',
    password: '',
  })

  const handleCreateAction = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3001/users', newUser);
      console.log('Response data:', response.data);
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to register user. Please try again.');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center" style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 shadow-lg border-0 rounded-4">
              <CCardBody className="p-5">
                <div className="text-center mb-4">
                  <CIcon icon={cilUser} size="xxl" className="mb-2 text-info" />
                  <h1 className="fw-bold">Register</h1>
                  <p className="text-body-secondary">Create your new account at the clinic!</p>
                </div>
                <CForm onSubmit={handleCreateAction}>
                  <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-info text-white">
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                      type="text"
                      placeholder="Username" 
                      autoComplete="username" 
                      value={newUser.username}
                      onChange={(e)=> setNewUser({...newUser, username: e.target.value})}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-info text-white">@</CInputGroupText>
                    <CFormInput 
                      type="email"
                      placeholder="Email" 
                      autoComplete="email" 
                      required
                      value={newUser.email}
                      onChange={(e)=> setNewUser({...newUser, email: e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-info text-white">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={newUser.password}
                      onChange={(e)=> setNewUser({...newUser, password: e.target.value})}
                      required
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText className="bg-info text-white">
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirm Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid gap-2">
                    <CButton type="submit" color='info' size="lg" className="fw-bold">Create Account</CButton>
                    <Link to="/login" className="text-decoration-none">
                      <CButton color='danger' className="border border-danger text-light fw-bold" size="lg">Cancel</CButton>
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
