import { useEffect, useState } from "react";
import { TypeAccounts } from "./AccountsPage";

type TypeNewAccount = {
  name: string
  amount: number
  percentage: number
}

interface ModalAccountProps {
  totalPercentage: number
  editingAccount: TypeAccounts | null
  setAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  setEditingAccount: React.Dispatch<React.SetStateAction<TypeAccounts | null>>
}

function ModalAccount({ totalPercentage, setAccountModalOpen, editingAccount, setEditingAccount }: ModalAccountProps) {
  
  const [newAccount, setNewAccount] = useState<TypeNewAccount>({
    name: '',
    amount: 0,
    percentage: 0
  });

  useEffect(() => {
    if (editingAccount) setNewAccount(editingAccount)
  }, [editingAccount])

  const handleAddAccount = () => {}

  const closeModal = () => {
    setEditingAccount(null)
    setAccountModalOpen(false)
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4"> {editingAccount ? "Editar Cuenta" : "Nueva Cuenta"}</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Cuenta
            </label>
            <input
              type="text"
              value={newAccount.name}
              onChange={(e) =>
                setNewAccount({ ...newAccount, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre de la cuenta"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Saldo Inicial
            </label>
            <input
              type="number"
              value={newAccount.amount}
              onChange={(e) =>
                setNewAccount({ ...newAccount, amount: parseFloat(e.target.value) })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Porcentaje de Distribución
            </label>
            <input
              type="number"
              min="1"
              max={100 - totalPercentage}
              value={newAccount.percentage}
              onChange={(e) =>
                setNewAccount({
                  ...newAccount,
                  percentage: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Porcentaje"
            />
            <p className="text-xs text-gray-500 mt-1">
              Disponible: {100 - totalPercentage}%
            </p>
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
            onClick={handleAddAccount}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            // disabled={}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAccount;
