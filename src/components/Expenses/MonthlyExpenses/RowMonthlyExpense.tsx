import { CheckCircle, Edit, Trash2, XCircle } from "lucide-react";
import { TypeMonthlyExpense } from "./MonthlyExpenses";



interface RowMonthlyExpenseProps {
  expense: TypeMonthlyExpense
}

function RowMonthlyExpense({ expense }: RowMonthlyExpenseProps) {
  
  const toggleMonthlyExpensePayment = () => {
    // 1. expense.id. Función para cambiar estado de cuenta.
  }

  const openEditMonthlyExpenseModal = () => {}

  const openDeleteConfirmation = () => {}
  
  return (
    <tr key={expense.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {expense.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
        ${expense.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expense.paymentDay}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
          style={{
            backgroundColor: expense.accountColor + "20",
            color: expense.accountColor,
          }}
        >
          {expense.account}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={
            `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
            ${
              expense.paymentStatus === "paid" ? 
                "bg-green-100 text-green-800" : 
                expense.paymentStatus === "upcoming" ? 
                "bg-blue-100 text-blue-800" :
                "bg-red-100 text-red-800"
            }
            `
          }
        >
          {
            expense.paymentStatus === "paid" 
              ? "Pagado"
              : expense.paymentStatus === "upcoming" 
              ? "Próximo a pagar"
              : "Pendiente"
          }
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={toggleMonthlyExpensePayment}
            className={`p-2 rounded ${
              expense.paymentStatus === "paid"
                ? "bg-gray-100 text-gray-600"
                : expense.paymentStatus === "upcoming"
                ? "bg-blue-100 text-blue-600"
                : "bg-red-100 text-red-600"
            } hover:opacity-80`}
            title={
              expense.paymentStatus === "paid"
                ? "Marcar como pendiente"
                : expense.paymentStatus === "upcoming"
                ? "Marcar como pagado"
                : "Marcar como pagado"
            }
          >
            {expense.paymentStatus === "paid" ? (
              <XCircle size={16} />
            ) : (
              <CheckCircle size={16} />
            )}
          </button>
          <button
            onClick={openEditMonthlyExpenseModal}
            className="p-2 bg-yellow-100 text-yellow-600 rounded hover:opacity-80"
            title="Editar gasto mensual"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={openDeleteConfirmation}
            className="p-2 bg-red-100 text-red-600 rounded hover:opacity-80"
            title="Eliminar gasto mensual"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RowMonthlyExpense;
