import { useState } from "react";

interface ModalExportProps {
  setShowExportModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ModalExport({ setShowExportModal }: ModalExportProps) {
  const [exportPassword, setExportPassword] = useState<string>('')

  const exportData = () => {}
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold mb-4">Exportar Datos</h3>
        <p className="text-gray-600 mb-4">
          Ingresa la contraseña para confirmar la exportación
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={exportPassword}
              onChange={(e) => setExportPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa la contraseña"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowExportModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={exportData}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Exportar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalExport;
