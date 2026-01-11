import { Receipt, Trash2 } from "lucide-react";
import { TypeIncome } from "../IncomesPage";

interface RowProps {
  income: TypeIncome
}

function RowIncome({ income }: RowProps) {
  
  const generateReceipt = () => {
    /**
     * 1. Obtener la ruta de descarga
     * 2. Enviar datos al backend para 
     *    crear un pdf con esos datos 
     */
  }

  const handleDelete = () => {
    /**
     * 1. Abrir modal para confirmar eliminación
     * 2. Enviar el mensaje de eliminación y la función a ejecutar
     */
  }
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {income.date}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500">{income.description}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
        ${income.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            income.type === "cliente"
              ? "bg-blue-100 text-blue-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {income.type}
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
            onClick={handleDelete}
            className="p-2 bg-red-100 text-red-600 rounded hover:opacity-80"
            title="Eliminar ingreso"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default RowIncome;
