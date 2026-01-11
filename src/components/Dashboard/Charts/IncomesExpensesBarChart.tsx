import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export type IncomeData = {
  name: string,
  income: number,
  expenses: number
}

interface IncomesExpensesBarChartProps {
  incomeData: IncomeData[]
}


function IncomesExpensesBarChart({ incomeData }: IncomesExpensesBarChartProps) {
  return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Ingresos vs Gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#10B981" name="Ingresos" />
              <Bar dataKey="expenses" fill="#EF4444" name="Gastos" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  )
}

export default IncomesExpensesBarChart