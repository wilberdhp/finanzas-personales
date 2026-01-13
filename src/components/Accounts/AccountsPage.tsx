
import { useState } from "react";
import AccountsPieChart from "./AccountsPieChart";
import { Plus, Trash2 } from "lucide-react";
import CardAccount from "./CardAccount";
import ModalAccount from "./ModalAccount";

export type TypeAccounts = {
  id: number;
  color: string;
  name: string;
  percentage: number;
  amount: number;
};

function AccountsPage() {

  const [accountModalOpen, setAccountModalOpen] = useState<boolean>(false)
  const [editingAccount, setEditingAccount] = useState<TypeAccounts | null>(null)

  const accounts: TypeAccounts[] = [];

  const totalPercentage = accounts.reduce(
    (sum, acc) => sum + acc.percentage,
    0
  );
  const canAddAccount = totalPercentage < 100;

  const deleteAllData = () => {}

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Cuentas</h2>
        <div className="flex space-x-3">
          <button
            onClick={() => setAccountModalOpen(true)}
            disabled={!canAddAccount}
            className={`px-4 py-2 rounded-lg flex items-center ${
              canAddAccount
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}
          >
            <Plus size={20} className="mr-2" />
            Nueva Cuenta
          </button>
          <button
            onClick={deleteAllData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700"
          >
            <Trash2 size={20} className="mr-2" />
            Eliminar Todas
          </button>
        </div>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Distribución de Cuentas</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              totalPercentage === 100
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            Total: {totalPercentage}%
          </span>
        </div>
        <AccountsPieChart 
          accounts={accounts}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <CardAccount 
            key={account.id}
            account={account}
            setAccountModalOpen={setAccountModalOpen}
            setEditingAccount={setEditingAccount}
          />
        ))}
      </div>

      {accountModalOpen && (
        <ModalAccount 
          totalPercentage={totalPercentage} 
          setAccountModalOpen={setAccountModalOpen}
          editingAccount={editingAccount}
          setEditingAccount={setEditingAccount}
        />
      )}
    </div>
  );
}

export default AccountsPage;
