import { CheckCircle, Edit, Trash2 } from "lucide-react";
import { TypeDebt } from "./DebtsPage";

interface CardDebtProps {
  debt: TypeDebt
  setDebtModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditingDebt: React.Dispatch<React.SetStateAction<TypeDebt | null>>
}

function CardDebt({ debt, setDebtModalOpen, setEditingDebt }: CardDebtProps) {
  
  const toggleDebtPayment = () => {}
  const openDeleteConfirmation = () => {}

  const editDebt = () => {
    setDebtModalOpen(true)
    setEditingDebt(debt)
  }
  
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div
        className="h-2"
        style={{ backgroundColor: debt.accountColor || "#6B7280" }}
      ></div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {debt.creditor}
            </h3>
            <p className="text-sm text-gray-500">ID: {debt.id}</p>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              debt.paid
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {debt.paid ? "Pagada" : "Pendiente"}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Monto</p>
            <p className="font-medium">${debt.amount}</p>
          </div>
          <div>
            <p className="text-gray-500">Tipo</p>
            <p className="font-medium">{debt.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Interés</p>
            <p className="font-medium">{debt.interestRate}%</p>
          </div>
          <div>
            <p className="text-gray-500">Cuenta</p>
            <p className="font-medium">
              {debt.accountName || "Cuenta no encontrada"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Inicio</p>
            <p className="font-medium">{debt.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Fin</p>
            <p className="font-medium">{debt.endDate}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500">Próximo Pago</p>
            <p className="font-medium">
              {debt.nextPayment || "No especificado"}
            </p>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          {!debt.paid && (
            <button
              onClick={toggleDebtPayment}
              className="p-2 bg-green-100 text-green-600 rounded hover:opacity-80"
              title="Liquidar deuda"
            >
              <CheckCircle size={16} />
            </button>
          )}
          <button
            onClick={editDebt}
            className="p-2 bg-yellow-100 text-yellow-600 rounded hover:opacity-80"
            title="Editar deuda"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={openDeleteConfirmation}
            className="p-2 bg-red-100 text-red-600 rounded hover:opacity-80"
            title="Eliminar deuda"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardDebt;
