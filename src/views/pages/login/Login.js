import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  return (
    <div className="bg-body-white min-vh-100 d-flex flex-row align-items-center">
      <CModal
        alignment="center"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Recuperación de Contraseña</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Por favor digite su correo electrónico para enviarle un enlace de recuperación de contraseña.
          <CInputGroup className="mb-2">
              <CInputGroupText>@</CInputGroupText>
              <CFormInput placeholder="Email" autoComplete="email" />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cerrar
          </CButton>
          <CButton color="info">Enviar</CButton>
        </CModalFooter>
      </CModal>

      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Inicio de Sesión</h1>
                    <p className="text-body-secondary">Inicia sesión con tus datos</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Correo" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <Link to="/dashboard">
                        <CButton color="info" className="px-4">
                          Iniciar Sesión
                        </CButton>
                        </Link>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="info" className="px-0" onClick={() => setVisible(true)}>
                          ¿Olvidó su contraseña?
                        </CButton>
                        </CCol>

                    </CRow>
                    <CCardBody className="text-center">
                    <p className="text-body-secondary">¿No estas registrado?</p> 
                      <Link to="/register">
                        <CButton color="info" className="mt-0" active tabIndex={-1} >
                        ¡Registrate aquí!
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
