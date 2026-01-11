import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar";
import useApp from "./hooks/useApp";

function App() {

  const { sidebarOpen, setSidebarOpen } = useApp()

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">

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
