import { useState } from "react";

type IncomeForm = {
  date: string
  description: string
  amount: string
  type: string
}

interface ModalIncomeProps {
  setIncomeModalOpen: (value: boolean) => void
}

function ModalIncome({ setIncomeModalOpen }: ModalIncomeProps) {
  const [newIncome, setNewIncome] = useState<IncomeForm>({ date: '', description: '', amount: '', type: '' });
  
  const handleAddIncome = () => {
    // TODO: Función del backend para agregar un nuevo ingreso
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Nuevo Ingreso</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha
            </label>
            <input
              type="date"
              value={newIncome.date}
              onChange={(e) =>
                setNewIncome({ ...newIncome, date: e.target.value })
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
              value={newIncome.description}
              onChange={(e) =>
                setNewIncome({ ...newIncome, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descripción del ingreso"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              type="number"
              value={newIncome.amount}
              onChange={(e) =>
                setNewIncome({ ...newIncome, amount: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo
            </label>
            <select
              value={newIncome.type}
              onChange={(e) =>
                setNewIncome({ ...newIncome, type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cliente">Cliente</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setIncomeModalOpen(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddIncome}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalIncome;
