import { Plus, Trash2 } from 'lucide-react';
import TableIncomes from './Table/TableIncomes';
import { useState } from 'react';
import ModalIncome from './ModalIncome';

export type TypeIncome = {
  id: number
  date: string
  description: string
  amount: string
  type: string
}


function IncomesPage() {

  const [incomeModalOpen, setIncomeModalOpen] = useState<boolean>(false)
  const incomes: TypeIncome[] = []

  const handleDeleteAllData = () => {
    /**
     * 1. Abrir modal de confirmación de eliminación
     * 2. Enviar función de eliminar
     */
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Historial de Ingresos</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIncomeModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
          >
            <Plus size={20} className="mr-2" />
            Nuevo Ingreso
          </button>
          <button 
            onClick={handleDeleteAllData}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700"
          >
            <Trash2 size={20} className="mr-2" />
            Eliminar Todos
          </button>
        </div>
      </div>
      
      <TableIncomes 
        incomes={incomes}
      />

      {incomeModalOpen && (
        <ModalIncome 
          setIncomeModalOpen={setIncomeModalOpen}
        />
      )}
    </div>
  );
}

export default IncomesPage