import { useEffect, useState } from "react";
import { TypeAccounts } from "../Accounts/AccountsPage";
import { TypeInvestment } from "./InvestmentsPage";

type TypeNewInvestment = {
  name: string
  amount: number | string
  type: string
  risk: string
  startDate: string
  endDate: string
  expectedReturn: number | string
  accountId: number | null
}

interface ModalInvestmentsProps {
  editingInvestment: TypeInvestment | null
  setEditingInvestment: React.Dispatch<React.SetStateAction<TypeInvestment | null>>
  setInvestmentModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalInvestments({ editingInvestment, setEditingInvestment, setInvestmentModalOpen }: ModalInvestmentsProps) {

  const [newInvestment, setNewInvestment] = useState<TypeNewInvestment>({
    name: '',
    amount: '',
    type: 'Fondos',
    risk: 'Bajo',
    startDate: '',
    endDate: '',
    expectedReturn: '',
    accountId: null
  });

  useEffect(() => {
    if (editingInvestment) setNewInvestment(editingInvestment)
  }, [editingInvestment])
  
  const accounts: TypeAccounts[] = []

  const handleAddInvestment = () => {}

  const closeModal = () => {
    setInvestmentModalOpen(false)
    setEditingInvestment(null)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">{editingInvestment ? "Editar Inversión" : "Nueva Inversión"}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Inversión
            </label>
            <input
              type="text"
              value={newInvestment.name}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la inversión"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              type="number"
              value={newInvestment.amount}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, amount: e.target.value })
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
              value={newInvestment.type}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, type: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Fondos">Fondos</option>
              <option value="Acciones">Acciones</option>
              <option value="Bonos">Bonos</option>
              <option value="Criptomonedas">Criptomonedas</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nivel de Riesgo
            </label>
            <select
              value={newInvestment.risk}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, risk: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Bajo">Bajo</option>
              <option value="Medio">Medio</option>
              <option value="Alto">Alto</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rendimiento Estimado (%)
            </label>
            <input
              type="number"
              value={newInvestment.expectedReturn}
              onChange={(e) =>
                setNewInvestment({
                  ...newInvestment,
                  expectedReturn: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Inicio
            </label>
            <input
              type="date"
              value={newInvestment.startDate}
              onChange={(e) =>
                setNewInvestment({
                  ...newInvestment,
                  startDate: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Fin
            </label>
            <input
              type="date"
              value={newInvestment.endDate}
              onChange={(e) =>
                setNewInvestment({ ...newInvestment, endDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuenta de Inversión
            </label>
            <select
              value={newInvestment.accountId || ""}
              onChange={(e) =>
                setNewInvestment({
                  ...newInvestment,
                  accountId: parseInt(e.target.value) || null,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Seleccionar cuenta</option>
              {accounts
                .filter((acc) => acc.name === "Inversiones")
                .map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} (${account.amount})
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddInvestment}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editingInvestment ? "Actualizar" : "Guardar"}   
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalInvestments;
