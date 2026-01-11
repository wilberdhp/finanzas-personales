import { DollarSign, TrendingUp, CreditCard, X, Wallet, TrendingDown, Settings } from 'lucide-react';
import { useState } from 'react';
import useApp, { TypeCurrentPage } from '../hooks/useApp';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
  { id: 'incomes', label: 'Ingresos', icon: DollarSign },
  { id: 'expenses', label: 'Gastos', icon: CreditCard },
  { id: 'accounts', label: 'Cuentas', icon: Wallet },
  { id: 'investments', label: 'Inversiones', icon: TrendingUp },
  { id: 'debts', label: 'Deudas', icon: TrendingDown },
  { id: 'settings', label: 'Configuración', icon: Settings }
]

function Sidebar() {
  
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const { currentPage, setCurrentPage } = useApp()
  
  return (
    <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold">Finanzas Personales</h1>
        <button 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-8">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              setCurrentPage(item.id as TypeCurrentPage);
              setSidebarOpen(false);
            }}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
              currentPage === item.id ? 'bg-blue-600' : ''
            }`}
          >
            <item.icon size={20} className="mr-3" />
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar