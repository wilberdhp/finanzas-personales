import "./App.css";
import AccountsPage from "./components/Accounts/AccountsPage";
import Dashboard from "./components/Dashboard/Dashboard";
import DebtsPage from "./components/Debts/DebtsPage";
import ExpensesPage from "./components/Expenses/ExpensesPage";
import Header from "./components/Header/Header";
import IncomesPage from "./components/Incomes/IncomesPage";
import InvestmentsPage from "./components/Investments/InvestmentsPage";
import SettingsPage from "./components/Settings/SettingsPage";
import Sidebar from "./components/Sidebar";
import useApp from "./hooks/useApp";

function App() {

  const { currentPage, sidebarOpen, setSidebarOpen } = useApp()

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'incomes' && <IncomesPage />}
          {currentPage === 'expenses' && <ExpensesPage />}
          {currentPage === 'accounts' && <AccountsPage />}
          {currentPage === 'investments' && <InvestmentsPage />}
          {currentPage === 'debts' && <DebtsPage />}
          {currentPage === 'settings' && <SettingsPage />}
        </main>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default App;
