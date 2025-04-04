import React from 'react'

type Fatura = {
  id: number
  customerNumber: string
  referenceMonth: string
  energyKwh: number
  energyValue: number
  sceeeKwh: number
  sceeeValue: number
  gdKwh: number
  gdValue: number
  publicLighting: number
  totalConsumptionKwh: number
  totalValueWithoutGd: number
  economyGd: number
  createdAt: string
  updatedAt: string
}

type FaturasTableProps = {
  faturas: Fatura[]
}

const FaturasTable: React.FC<FaturasTableProps> = ({ faturas }) => {
  return (
    <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-lg">
      <table className="min-w-full bg-white rounded-lg">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Cliente</th>
            <th className="py-2 px-4 text-left">Mês</th>
            <th className="py-2 px-4 text-left">Energia (kWh)</th>
            <th className="py-2 px-4 text-left">Valor Energia (R$)</th>
            <th className="py-2 px-4 text-left">Energia SCEE (kWh)</th>
            <th className="py-2 px-4 text-left">Valor SCEE (R$)</th>
            <th className="py-2 px-4 text-left">Energia GD (kWh)</th>
            <th className="py-2 px-4 text-left">Valor GD (R$)</th>
            <th className="py-2 px-4 text-left">Iluminação Pública (R$)</th>
            <th className="py-2 px-4 text-left">Total Consumo (kWh)</th>
            <th className="py-2 px-4 text-left">Valor Sem GD (R$)</th>
            <th className="py-2 px-4 text-left">Economia GD (R$)</th>
            <th className="py-2 px-4 text-left">Criado Em</th>
            <th className="py-2 px-4 text-left">Atualizado Em</th>
          </tr>
        </thead>
        <tbody>
          {faturas.map((fatura) => (
            <tr key={fatura.id} className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">{fatura.id}</td>
              <td className="py-2 px-4">{fatura.customerNumber}</td>
              <td className="py-2 px-4">{fatura.referenceMonth}</td>
              <td className="py-2 px-4">{fatura.energyKwh}</td>
              <td className="py-2 px-4">{fatura.energyValue.toFixed(2)}</td>
              <td className="py-2 px-4">{fatura.sceeeKwh}</td>
              <td className="py-2 px-4">{fatura.sceeeValue.toFixed(2)}</td>
              <td className="py-2 px-4">{fatura.gdKwh}</td>
              <td className="py-2 px-4">{fatura.gdValue.toFixed(2)}</td>
              <td className="py-2 px-4">{fatura.publicLighting.toFixed(2)}</td>
              <td className="py-2 px-4">{fatura.totalConsumptionKwh}</td>
              <td className="py-2 px-4">
                {fatura.totalValueWithoutGd.toFixed(2)}
              </td>
              <td className="py-2 px-4">{fatura.economyGd.toFixed(2)}</td>
              <td className="py-2 px-4">
                {new Date(fatura.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 px-4">
                {new Date(fatura.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default FaturasTable
