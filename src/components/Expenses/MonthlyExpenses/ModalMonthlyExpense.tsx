import { useEffect, useState } from "react";
import useApp from "../../../hooks/useApp";

type TypeNewMonthlyExpense = {
  description: string
  amount: string
  paymentDay: string
  accountId: number | null
}

type TypeAccount = {
  id: number
  name: string
  amount: number
}

function ModalMonthlyExpense() {

  const [newMonthlyExpense, setNewMonthlyExpense] = useState<TypeNewMonthlyExpense>({
    description: '', amount: '', paymentDay: '', accountId: null
  });

  // TODO: obtener datos de las cuentas
  const accounts: TypeAccount[] = []

  const { setOpenMonthlyExpenseModal, editingMonthlyExpense } = useApp()

  useEffect(() => {
    if (editingMonthlyExpense) setNewMonthlyExpense(editingMonthlyExpense)
  }, [editingMonthlyExpense])

  const handleAddMonthlyExpense = () => {
    // TODO: agregar nuevo gasto
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">{editingMonthlyExpense ? "Editar Gasto Mensual" : "Nuevo Gasto Mensual"}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              value={newMonthlyExpense.description}
              onChange={(e) =>
                setNewMonthlyExpense({
                  ...newMonthlyExpense,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción del gasto mensual"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              type="number"
              value={newMonthlyExpense.amount}
              onChange={(e) =>
                setNewMonthlyExpense({
                  ...newMonthlyExpense,
                  amount: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Día de Pago
            </label>
            <input
              type="number"
              min="1"
              max="31"
              value={newMonthlyExpense.paymentDay}
              onChange={(e) =>
                setNewMonthlyExpense({
                  ...newMonthlyExpense,
                  paymentDay: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Día del mes"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuenta de Pago
            </label>
            <select
              value={newMonthlyExpense.accountId || ""}
              onChange={(e) =>
                setNewMonthlyExpense({
                  ...newMonthlyExpense,
                  accountId: parseInt(e.target.value) || null,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar cuenta</option>
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.name} (${account.amount})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setOpenMonthlyExpenseModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddMonthlyExpense}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalMonthlyExpense;
