import { Trash2, TrendingUp } from 'lucide-react';
import { useState } from 'react'
import CardInvestment from './CardInvestment';
import ModalInvestments from './ModalInvestments';

export type TypeInvestment = {
  id: number
  name: string
  risk: string
  amount: number
  type: string
  expectedReturn: number
  startDate: string
  endDate: string
  status: string
  accountId: number
  accountName: string
  accountColor: string
}


function InvestmentsPage() {
  
  const [investmentModalOpen, setInvestmentModalOpen] = useState<boolean>(false)
  const [editingInvestment, setEditingInvestment] = useState<TypeInvestment | null>(null)

  const investments: TypeInvestment[] = []

  const deleteAllData = () => {}
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gestión de Inversiones</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setInvestmentModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          >
            <TrendingUp size={20} className="mr-2" />
            Nueva Inversión
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
        {investments.map((investment) => (
          <CardInvestment 
            key={investment.id}
            investment={investment}
            setEditingInvestment={setEditingInvestment}
            setInvestmentModalOpen={setInvestmentModalOpen}
          />
        ))}
      </div>

      {investmentModalOpen && (
        <ModalInvestments 
          editingInvestment={editingInvestment}
          setEditingInvestment={setEditingInvestment}
          setInvestmentModalOpen={setInvestmentModalOpen}
        />
      )}
    </div>
  );
}

export default InvestmentsPage