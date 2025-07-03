import { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import { CChartDoughnut, CChartBar } from '@coreui/react-chartjs'


const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [statusCount, setStatusCount] = useState({ pending: 0, completed: 0, canceled: 0 })
  const [monthlyAppointments, setMonthlyAppointments] = useState(Array(12).fill(0))
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  // Obtener el role_id del usuario desde localStorage
  let roleId = null
  try {
    const userData = JSON.parse(localStorage.getItem('user'))
    roleId = userData?.user?.role_id
  } catch (e) {
    roleId = null
  }

  // Si el usuario es role_id=1, no mostrar nada
  if (roleId === 1) {
    return null
  }

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:4000/appointments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await res.json()

        setAppointments(data)

        const statusData = { pending: 0, completed: 0, canceled: 0 }
        const monthly = Array(12).fill(0)

        data.forEach((appt) => {
          statusData[appt.status] = (statusData[appt.status] || 0) + 1
          const month = new Date(appt.date).getMonth()
          monthly[month]++
        })

        setStatusCount(statusData)
        setMonthlyAppointments(monthly)
      } catch (err) {
        console.error('Error loading appointments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  useEffect(() => {
    fetch('http://localhost:4000/user')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setUsers(data)
        else if (Array.isArray(data.users)) setUsers(data.users)
        else if (Array.isArray(data.data)) setUsers(data.data)
        else setUsers([])
      })
      .catch(() => setUsers([]))
  }, [])

  // Busca el nombre del doctor usando user_id
  const getDoctorName = (doctor) => {
    if (doctor && typeof doctor === 'object' && doctor.user_id && Array.isArray(users)) {
      const user = users.find(u => u.user_id === doctor.user_id)
      if (user) {
        return `${user.first_name} ${user.last_name}`
      }
    }
    return 'N/A'
  }

  return (
    <div>
      <CRow className="component-space d-flex justify-content-center">
        <CCol md={5}>
          <CCard>
            <CCardBody>
              <h5>Citas por Estado</h5>
              {loading ? (
                <div className="cards-container">Cargando contenido...</div>
              ) : (
                <CChartDoughnut
                  data={{
                    labels: ['Pendientes', 'Completadas', 'Canceladas'],
                    datasets: [
                      {
                        data: [statusCount.pending, statusCount.completed, statusCount.canceled],
                        backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384'],
                      },
                    ],
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol md={7}>
          <CCard>
            <CCardBody>
              <h5>Citas por Mes</h5>
              {loading ? (
                <div className="cards-container">Cargando contenido...</div>
              ) : (
                <CChartBar
                  data={{
                    labels: [
                      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
                    ],
                    datasets: [
                      {
                        label: 'Citas por mes',
                        backgroundColor: '#36A2EB',
                        data: monthlyAppointments,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      
      <div style={{ marginTop: '2.5rem' }}></div>

      <CRow className="component-space d-flex justify-content-center">
        <CCol md={10}>
          <CCard>
            <CCardBody>
              <h5>Last 5 Appointments</h5>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Patient</CTableHeaderCell>
                    <CTableHeaderCell>Doctor</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {loading ? (
                    <CTableRow>
                      <CTableDataCell colSpan={4} style={{ textAlign: 'center' }}>
                        Loading content...
                      </CTableDataCell>
                    </CTableRow>
                  ) : appointments.slice(0, 5).map((appt) => (
                    <CTableRow key={appt.appointment_id}>
                      <CTableDataCell>{appt.patient?.first_name} {appt.patient?.last_name}</CTableDataCell>
                      <CTableDataCell>{getDoctorName(appt.doctor)}</CTableDataCell>
                      <CTableDataCell>{new Date(appt.date).toLocaleString()}</CTableDataCell>
                      <CTableDataCell>{appt.status}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default AppointmentDashboard