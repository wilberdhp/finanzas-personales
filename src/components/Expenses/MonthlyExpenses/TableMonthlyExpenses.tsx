import RowMonthlyExpense from "./RowMonthlyExpense";
import { TypeMonthlyExpense } from "./MonthlyExpenses";

function TableMonthlyExpenses() {
  
  const monthlyExpenses: TypeMonthlyExpense[] = []
  
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Descripción
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Monto
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Día de Pago
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Cuenta
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Estado
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {monthlyExpenses.map((expense) => (
          <RowMonthlyExpense
            key={expense.id}
            expense={expense}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TableMonthlyExpenses;
