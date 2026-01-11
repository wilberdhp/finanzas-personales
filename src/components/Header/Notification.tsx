import { X } from "lucide-react";

export type TypeNotification = {
  id: number;
  message: string;
  date: string;
  type: string;
};

interface NotificationProps {
  notification: TypeNotification;
  removeNotification: (id: number) => void
}

function Notification({ notification, removeNotification }: NotificationProps) {

  return (
    <div className="p-4 border-b border-gray-100 hover:bg-gray-50 flex justify-between items-start">
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
  );
}

export default Notification;
