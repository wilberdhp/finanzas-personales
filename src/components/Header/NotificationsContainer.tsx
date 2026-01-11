import { useState } from "react";
import Notification, { TypeNotification } from "./Notification";
import { Bell } from "lucide-react";

interface NotificationsContainerProps {
  notificationMenuOpen: boolean
  setNotificationMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function NotificationsContainer({ notificationMenuOpen, setNotificationMenuOpen }: NotificationsContainerProps ) {
  const [notifications, setNotifications] = useState<TypeNotification[]>([]);

  const removeNotification = (id: number) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };


  return (
    <div className="relative">
      <button
        onClick={() => setNotificationMenuOpen((state) => !state)}
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
              notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                  removeNotification={removeNotification}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsContainer;
