import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FaturasTable from './components/FaturasTable'
import Loading from './components/Loading'
import { FaGithub } from 'react-icons/fa'

const App: React.FC = () => {
  const [faturas, setFaturas] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFaturas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/faturas')
        setFaturas(response.data)
      } catch (error) {
        console.error('Erro ao buscar faturas', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFaturas()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 opacity-90 py-6">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg opacity-95">
        {/* Título estilizado com mais ênfase */}
        <h1 className="text-5xl font-extrabold text-center text-indigo-600 mb-8">
          Faturas de Energia
        </h1>
        <div className="mt-12 text-center text-white text-lg">
          <a
            href="https://github.com/LucasRafa13"
            target="_blank"
            rel="noopener noreferrer"
            className="flex justify-center items-center mt-4 text-lg  text-indigo-600 hover:text-indigo-200"
          >
            <FaGithub className="mr-2 text-2xl" />
            Desenvolvido por Lucas Lima
          </a>
        </div>
        <p className="text-center text-lg text-gray-700 mb-4">
          Abaixo estão as faturas de energia registradas
        </p>
        {loading ? <Loading /> : <FaturasTable faturas={faturas} />}
      </div>
    </div>
  )
}

export default App
