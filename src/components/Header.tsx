import { Bell, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import useApp from '../hooks/useApp';

type TypeNotification = {
  id: number,
  message: string
  date: string
  type: string
}

function Header() {

  const [notificationMenuOpen, setNotificationMenuOpen] = useState<boolean>(false)
  const [notifications, setNotifications] = useState<TypeNotification[]>([]);
  const { currentPage, setSidebarOpen, reset } = useApp()

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

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
        <div className="relative">
          <button 
            onClick={() => setNotificationMenuOpen(state => !state)}
            className="relative p-2 text-gray-600 hover:text-gray-900"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          
          {notificationMenuOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold">Notificaciones</h3>
                <button 
                  onClick={clearAllNotifications}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Limpiar todo
                </button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No hay notificaciones
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.date}</p>
                      </div>
                      <button 
                        onClick={() => removeNotification(notification.id)}
                        className="text-gray-400 hover:text-red-500 ml-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
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