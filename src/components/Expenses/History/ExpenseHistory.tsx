import TableExpenseHistory from "./TableExpenseHistory";

function ExpenseHistory() {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Historial de Gastos</h3>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <TableExpenseHistory />
        </div>
      </div>
    </div>
  );
}

export default ExpenseHistory;
