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
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleCreateAction}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your new account at the clinic!</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                    type="text"
                    placeholder="Username" 
                    autoComplete="username" 
                    value={newUser.username}
                    onChange={(e)=> setNewUser({...newUser, username: e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput 
                    type="email"
                    placeholder="Email" 
                    autoComplete="email" 
                    required
                    value={newUser.email}
                    onChange={(e)=> setNewUser({...newUser, email: e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={newUser.password}
                      onChange={(e)=> setNewUser({...newUser, password: e.target.value})}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={newUser.password}
                      onChange={(e)=> setNewUser({...newUser, password: e.target.value})}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    
                    <CButton type="submit" color='info' >Create Account</CButton>
                    <Link to="/login">
                    <CButton color='danger'>Cancel</CButton>
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
