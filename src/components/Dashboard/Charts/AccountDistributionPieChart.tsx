import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export type AccountData = {
  name: string
  value: number
}

interface AccountDistributionPieChartProps {
  accountData: AccountData[]
}

function AccountDistributionPieChart({ accountData }: AccountDistributionPieChartProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Distribución de Cuentas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={accountData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${percent && (percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {accountData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccountDistributionPieChart;
