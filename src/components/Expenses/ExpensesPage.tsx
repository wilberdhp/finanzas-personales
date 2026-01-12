import { Plus, Repeat, Trash2 } from "lucide-react";
import MonthlyExpenses from "./MonthlyExpenses/MonthlyExpenses";
import useApp from "../../hooks/useApp";
import ModalMonthlyExpense from "./MonthlyExpenses/ModalMonthlyExpense";
import ExpenseHistory from "./History/ExpenseHistory";
import ModalExpense from "./History/ModalExpense";

function ExpensesPage() {
  
  const { setOpenExpenseModal, setOpenMonthlyExpenseModal, openMonthlyExpenseModal, openExpenseModal } = useApp()

  const deleteAllExpenses = () => {}
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Historial de Gastos</h2>
        <div className="flex space-x-3">
          <button 
            onClick={() => setOpenMonthlyExpenseModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-purple-700"
          >
            <Repeat size={20} className="mr-2" />
            Gasto Mensual
          </button>
          <button 
            onClick={() => setOpenExpenseModal(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700"
          >
            <Plus size={20} className="mr-2" />
            Nuevo Gasto
          </button>
          <button 
            onClick={deleteAllExpenses}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-red-700"
          >
            <Trash2 size={20} className="mr-2" />
            Eliminar Todos
          </button>
        </div>
      </div>
      
      <MonthlyExpenses />
      
      <ExpenseHistory />

      {openExpenseModal && <ModalExpense />}

      {openMonthlyExpenseModal && <ModalMonthlyExpense />}
    </div>
  );
}

export default ExpensesPage