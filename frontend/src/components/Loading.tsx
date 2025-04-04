import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin border-4 border-t-4 border-indigo-600 border-solid rounded-full h-16 w-16"></div>
      <span className="ml-4 text-xl text-indigo-600">Carregando...</span>
    </div>
  )
}

export default Loading
