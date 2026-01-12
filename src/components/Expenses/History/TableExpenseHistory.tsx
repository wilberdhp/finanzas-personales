import { TypeCategory } from "./ModalExpense";
import RowExpense from "./RowExpense";

export type TypeExpense = {
  id: number
  date: string
  description: string
  amount: string
  category: TypeCategory
  isMonthly: boolean
  accountId: number | null
  paymentDay: number
  account: string
  accountColor: string
  paymentStatus: "paid" | "upcoming" | "pending"
}

function TableExpenseHistory() {
  
  const expenses: TypeExpense[] = []
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fecha
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Descripción
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Monto
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Categoría
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cuenta
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {expenses.map((expense) => (
          <RowExpense 
            key={expense.id}
            expense={expense}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TableExpenseHistory;
