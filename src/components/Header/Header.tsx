import { LogOut, Menu } from 'lucide-react';
import { useState } from 'react';
import useApp from '../../hooks/useApp';
import NotificationsContainer from './NotificationsContainer';


function Header() {

  const [notificationMenuOpen, setNotificationMenuOpen] = useState<boolean>(false)
  const { currentPage, setSidebarOpen, reset } = useApp()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden mr-4 text-gray-600"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl font-semibold capitalize">{currentPage}</h2>
      </div>
      <div className="flex items-center space-x-4">
        <NotificationsContainer
          notificationMenuOpen={notificationMenuOpen}
          setNotificationMenuOpen={setNotificationMenuOpen}
        />
        <button 
          onClick={reset}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <LogOut size={20} className="mr-1" />
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
}

export default Header