import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IncomeData } from "./IncomesExpensesBarChart";

interface IncomesLineChartProps {
  incomeData: IncomeData[]
}

function IncomesLineChart({ incomeData }: IncomesLineChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Tendencia de Ingresos</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={incomeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="income"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomesLineChart;
