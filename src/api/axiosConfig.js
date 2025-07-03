
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000', // puerto del backend
  withCredentials: true, // si usas cookies
})

export default api