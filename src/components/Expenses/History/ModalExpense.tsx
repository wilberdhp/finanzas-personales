import { useState } from "react";
import useApp from "../../../hooks/useApp";

export type TypeCategory = 'impuestos' | 'alquiler' | 'electricidad' | 'agua' | 'mantenimiento' | 'otros'

type TypeNewExpense = {
  date: string
  description: string
  amount: string
  category: TypeCategory
  isMonthly: boolean
  accountId: number | null
  paymentDay: number
}

type TypeAccount = {
  id: number
  name: string
  amount: number
}

function ModalExpense() {
  const [newExpense, setNewExpense] = useState<TypeNewExpense>({
    date: "",
    description: "",
    amount: "",
    category: "otros",
    isMonthly: false,
    accountId: null,
    paymentDay: 1
  });

  // TODO: obtener datos de las cuentas
  const accounts: TypeAccount[] = []

  const { setOpenExpenseModal } = useApp()

  const handleAddExpense = () => {}

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Nuevo Gasto</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={newExpense.date}
              onChange={(e) =>
                setNewExpense({ ...newExpense, date: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) =>
                setNewExpense({ ...newExpense, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción del gasto"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) =>
                setNewExpense({ ...newExpense, amount: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categoría
            </label>
            <select
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value as TypeCategory })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="impuestos">Impuestos</option>
              <option value="alquiler">Alquiler</option>
              <option value="electricidad">Electricidad</option>
              <option value="agua">Agua</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuenta de Pago
            </label>
            <select
              value={newExpense.accountId || ""}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isMonthly"
              checked={newExpense.isMonthly}
              onChange={(e) =>
                setNewExpense({ ...newExpense, isMonthly: e.target.checked })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isMonthly"
              className="ml-2 block text-sm text-gray-700"
            >
              Es un gasto mensual
            </label>
          </div>
          {newExpense.isMonthly && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Día de Pago
              </label>
              <input
                type="number"
                min="1"
                max="31"
                value={newExpense.paymentDay || ""}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    paymentDay: parseInt(e.target.value),
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Día del mes"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setOpenExpenseModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddExpense}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalExpense;
