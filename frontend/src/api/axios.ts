import axios from 'axios'

// Configuração do Axios para se comunicar com o backend
const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001', // URL da sua API Backend (ajuste conforme necessário)
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
