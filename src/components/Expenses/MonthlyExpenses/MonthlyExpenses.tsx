import TableMonthlyExpenses from "./TableMonthlyExpenses"

export type TypeMonthlyExpense = {
  id: string
  description: string
  amount: string
  paymentDay: string
  accountId: number
  account: string
  accountColor: string
  paymentStatus: "paid" | "upcoming" | "pending"
}

function MonthlyExpenses() {
  
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Gastos Mensuales</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <TableMonthlyExpenses />
        </div>
      </div>
    </div>
  );
}

export default MonthlyExpenses;
