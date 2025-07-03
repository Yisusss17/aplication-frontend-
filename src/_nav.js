import React from 'react'
import CIcon from '@coreui/icons-react'
import { 
  cilSpeedometer,
  cilUser,
  cilGroup,
  cilDescription,
  cilMedicalCross,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

// Obtener el usuario del localStorage
let userRoleId = null
try {
  const userData = JSON.parse(localStorage.getItem('user'))
  userRoleId = userData?.user?.role_id
} catch (e) {
  userRoleId = null
}

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,

  },
  

  {
    component: CNavTitle,
    name: 'modules',
  },
  // Solo mostrar Users si el role_id NO es 1
  ...(userRoleId !== 1
    ? [{
        component: CNavItem,
        name: 'Users',
        to: '/users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      }]
    : []
  ),
  {
    component: CNavItem,
    name: 'Patient',
    to: '/patient',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Appointments',
    to: '/appointment',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Medication',
    to: '/medication',
    icon: <CIcon icon={cilMedicalCross} customClassName="nav-icon" />,
  },
]

export default _nav
