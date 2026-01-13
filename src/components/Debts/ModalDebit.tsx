import { useEffect, useState } from "react";
import { TypeAccounts } from "../Accounts/AccountsPage";
import { TypeDebt } from "./DebtsPage";

type TypeNewDebt = {
  creditor: string
  amount: string | number
  type: string
  interestRate: string | number
  startDate: string
  endDate: string
  accountId: number | null
}

interface ModalDebitProps {
  editingDebt: TypeDebt | null
  setDebtModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditingDebt: React.Dispatch<React.SetStateAction<TypeDebt | null>>
}


function ModalDebit({ editingDebt, setDebtModalOpen, setEditingDebt }: ModalDebitProps) {

  const [newDebt, setNewDebt] = useState<TypeNewDebt>({
    creditor: '',
    amount: '',
    type: 'Préstamo',
    interestRate: '',
    startDate: '',
    endDate: '',
    accountId: null
  });

  useEffect(() => {
    if (editingDebt) setNewDebt(editingDebt)
  }, [editingDebt])

  const accounts: TypeAccounts[] = []

  const handleAddDebt = () => {}

  const closeModal = () => {
    setDebtModalOpen(false);
    setEditingDebt(null)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">{editingDebt ? "Editar Deuda" : "Nueva Deuda"}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Acreedor
            </label>
            <input
              type="text"
              value={newDebt.creditor}
              onChange={(e) =>
                setNewDebt({ ...newDebt, creditor: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del acreedor"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monto
            </label>
            <input
              type="number"
              value={newDebt.amount}
              onChange={(e) =>
                setNewDebt({ ...newDebt, amount: e.target.value })
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
              value={newDebt.type}
              onChange={(e) => setNewDebt({ ...newDebt, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Préstamo">Préstamo</option>
              <option value="Factura">Factura Pendiente</option>
              <option value="Compra">Compra</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tasa de Interés (%)
            </label>
            <input
              type="number"
              value={newDebt.interestRate}
              onChange={(e) =>
                setNewDebt({ ...newDebt, interestRate: e.target.value })
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
              value={newDebt.startDate}
              onChange={(e) =>
                setNewDebt({ ...newDebt, startDate: e.target.value })
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
              value={newDebt.endDate}
              onChange={(e) =>
                setNewDebt({ ...newDebt, endDate: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cuenta Asociada
            </label>
            <select
              value={newDebt.accountId || ""}
              onChange={(e) =>
                setNewDebt({
                  ...newDebt,
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
            onClick={closeModal}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddDebt}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {editingDebt ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDebit;
