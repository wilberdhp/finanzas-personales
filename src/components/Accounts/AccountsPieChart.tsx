import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { TypeAccounts } from "./AccountsPage";

interface AccountsPieChartProps {
  accounts: TypeAccounts[]
}

function AccountsPieChart({ accounts }: AccountsPieChartProps) {
  
  const valuesAccounts = accounts.map((acc) => ({ name: acc.name, value: acc.percentage }))
  
  return (
    <div className="mt-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={valuesAccounts}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="percentage"
          >
            {accounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AccountsPieChart;
