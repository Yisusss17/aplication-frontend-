import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilAccountLogout } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Aquí puedes limpiar el almacenamiento local/session si es necesario
    // localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <CIcon
        icon={cilAccountLogout}
        size="lg"
        onClick={handleLogout}
        style={{ cursor: 'pointer' }}
        title="Cerrar sesión"
      />
    </div>
  )
}

export default AppHeaderDropdown
