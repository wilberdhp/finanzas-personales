import { Edit, Trash2 } from "lucide-react";
import { TypeAccounts } from "./AccountsPage";

interface CardAccountProps {
  account: TypeAccounts
  setEditingAccount: React.Dispatch<React.SetStateAction<TypeAccounts | null>>
  setAccountModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CardAccount({ account, setEditingAccount, setAccountModalOpen }: CardAccountProps) {
  
  const handleEditAccount = () => {
    setAccountModalOpen(true)
    setEditingAccount(account)
  }

  const openDeleteConfirmation = () => {
    // TODO: Agregar función para eliminar
  }
  
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="h-2" style={{ backgroundColor: account.color }}></div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {account.name}
            </h3>
            <p className="text-sm text-gray-500">ID: {account.id}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {account.percentage}%
          </span>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-gray-900">${account.amount}</p>
          <p className="text-sm text-gray-500">Saldo actual</p>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={handleEditAccount}
            className="p-2 bg-yellow-100 text-yellow-600 rounded hover:opacity-80"
            title="Editar cuenta"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={openDeleteConfirmation}
            className="p-2 bg-red-100 text-red-600 rounded hover:opacity-80"
            title="Eliminar cuenta"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAccount;
