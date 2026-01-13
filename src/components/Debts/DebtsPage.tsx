import { Trash2, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import CardDebt from './CardDebt';
import ModalDebit from './ModalDebit';

export type TypeDebt = {
  id: number
  creditor: string
  paid: boolean
  amount: number
  type: string
  interestRate: number
  startDate: string
  endDate: string
  nextPayment: string
  accountId: number
  accountColor: string
  accountName: string
}

function DebtsPage() {
  
  const [debtModalOpen, setDebtModalOpen] = useState<boolean>(false);
  const [editingDebt, setEditingDebt] = useState<TypeDebt | null>(null)
  
  const debts: TypeDebt[] = []
  
  const deleteAllData = () => {}
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Deudas</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setDebtModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <TrendingDown size={20} className="mr-2" />
            Nueva Deuda
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {debts.map((debt) => (
          <CardDebt 
            key={debt.id}
            debt={debt}
            setDebtModalOpen={setDebtModalOpen}
            setEditingDebt={setEditingDebt}
          />
        ))}
      </div>

      {debtModalOpen && (
        <ModalDebit 
          editingDebt={editingDebt}
          setDebtModalOpen={setDebtModalOpen}
          setEditingDebt={setEditingDebt}
        />
      )}

    </div>
  );
}

export default DebtsPage

