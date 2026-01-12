import { Receipt, Trash2 } from "lucide-react";
import { TypeExpense } from "./TableExpenseHistory";

interface RowExpenseProps {
  expense: TypeExpense
}

function RowExpense({ expense }: RowExpenseProps) {
  
  const generateReceipt = () => {
    //TODO: Función para generar un recibo.
    // Enviar el id para solicitar los datos y generar el recibo
  }

  const openDeleteConfirmation = () => {}
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {expense.date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{expense.description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
        ${expense.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            expense.category === "impuestos"
              ? "bg-yellow-100 text-yellow-800"
              : expense.category === "alquiler"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {expense.category}
        </span>
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
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <button
            onClick={generateReceipt}
            className="p-2 bg-blue-100 text-blue-600 rounded hover:opacity-80"
            title="Generar recibo"
          >
            <Receipt size={16} />
          </button>
          <button
            onClick={openDeleteConfirmation}
            className="p-2 bg-red-100 text-red-600 rounded hover:opacity-80"
            title="Eliminar gasto"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RowExpense;
