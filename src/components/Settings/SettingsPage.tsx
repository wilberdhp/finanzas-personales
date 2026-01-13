import { Download, FileSpreadsheet, Lock } from 'lucide-react';
import { useState } from 'react';
import ModalExport from './ModalExport';


function SettingsPage() {
  
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [showExportModal, setShowExportModal] = useState<boolean>(false)

  const changePassword = () => {}
  
  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Configuración</h2>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lock size={20} className="mr-2" />
            Cambiar Contraseña
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña Actual</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa la nueva contraseña"
              />
            </div>
            <button
              onClick={changePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Cambiar Contraseña
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FileSpreadsheet size={20} className="mr-2" />
            Exportar Datos
          </h3>
          <p className="text-gray-600 mb-4">Exporta todos tus datos en un Excel</p>
          <button
            onClick={() => setShowExportModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <Download size={20} className="mr-2" />
            Exportar Datos
          </button>
        </div>
      </div>

      {showExportModal && (
        <ModalExport 
          setShowExportModal={setShowExportModal}
        />
      )}
    </div>
  );
}

export default SettingsPage