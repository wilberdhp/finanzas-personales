import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Wallet,
} from "lucide-react";
import CardSummary from "./CardSummary";
import CardSummaryTop from "./CardSummaryTop";
import IncomesExpensesBarChart, { IncomeData } from "./Charts/IncomesExpensesBarChart";
import AccountDistributionPieChart, { AccountData } from "./Charts/AccountDistributionPieChart";
import IncomesLineChart from "./Charts/IncomesLineChart";

function Dashboard() {
  const totalIncomes = 0; // Total de ingresos
  const totalExpenses = 0; // Total de gastos
  const netIncome = totalIncomes - totalExpenses;
  const totalInvestments = 0; // Total de inversiones
  const totalInvestmentAmount = 0; // Cantidad total en inversión
  const totalDebts = 0; // Total de deudas
  const totalDebtAmount = 0; // Cantidad total en deudas
  const availableFunds = 0; // Total entre todas las cuentas
  const totalBalance = 0; // Balance total

  const incomeData: IncomeData[] = []
  const accountData: AccountData[] = []
  // TODO: Crear funciones en backend para obtener estos datos de la base de datos

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <CardSummaryTop title="Balance Total" total={totalBalance} color="text-blue-600">
          <Wallet size={24} />
        </CardSummaryTop>

        <CardSummaryTop title="Ingresos" total={totalIncomes} color="text-green-600">
          <DollarSign size={24} />
        </CardSummaryTop>

        <CardSummaryTop title="Gastos" total={totalExpenses} color="text-red-600">
          <CreditCard size={24} />
        </CardSummaryTop>

        <CardSummaryTop title="Neto" total={netIncome} color="text-purple-600">
          <TrendingUp size={24} />
        </CardSummaryTop>        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <IncomesExpensesBarChart 
          incomeData={incomeData}
        />

        <AccountDistributionPieChart 
          accountData={accountData}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CardSummary
          title="Resumen de Inversiones"
          subtitle="Total Inversiones"
          total={totalInvestments}
          totalAmount={totalInvestmentAmount}
        />

        <CardSummary
          title="Resumen de Deudas"
          subtitle="Total Deudas"
          total={totalDebts}
          totalAmount={totalDebtAmount}
        />

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Fondos Disponibles</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              ${availableFunds}
            </p>
            <p className="text-sm text-gray-500 mt-2">Saldo total en cuentas</p>
          </div>
        </div>
      </div>

      <IncomesLineChart 
        incomeData={incomeData}
      />
    </div>
  );
}

export default Dashboard;
