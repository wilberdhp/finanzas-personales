import { Edit, Pause, Play, Trash2 } from "lucide-react"
import { TypeInvestment } from "./InvestmentsPage"


interface CardInvestmentProps {
  investment: TypeInvestment
  setEditingInvestment: React.Dispatch<React.SetStateAction<TypeInvestment | null>>
  setInvestmentModalOpen: React.Dispatch<React.SetStateAction<boolean>>

}

function CardInvestment({ investment, setEditingInvestment, setInvestmentModalOpen }: CardInvestmentProps) {
  
  const toggleInvestmentStatus = () => {
    // cambiar usando investment.id
  }
  
  const openEditInvestmentModal = () => {
    // abrir la modal y enviar los datos para modificarlos
    setEditingInvestment(investment);
    setInvestmentModalOpen(true)

  }

  const openDeleteConfirmation = () => {
    // abrir la confirmación de eliminación
  }
  
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
    >
      <div
        className="h-2"
        style={{ backgroundColor: investment.accountColor || "#6B7280" }}
      ></div>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {investment.name}
            </h3>
            <p className="text-sm text-gray-500">ID: {investment.id}</p>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              investment.risk === "Bajo"
                ? "bg-green-100 text-green-800"
                : investment.risk === "Medio"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {investment.risk}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Monto</p>
            <p className="font-medium">${investment.amount}</p>
          </div>
          <div>
            <p className="text-gray-500">Tipo</p>
            <p className="font-medium">{investment.type}</p>
          </div>
          <div>
            <p className="text-gray-500">Rendimiento Estimado</p>
            <p className="font-medium">{investment.expectedReturn}%</p>
          </div>
          <div>
            <p className="text-gray-500">Cuenta</p>
            <p className="font-medium">
              {investment.accountName || "Cuenta no encontrada"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Inicio</p>
            <p className="font-medium">{investment.startDate}</p>
          </div>
          <div>
            <p className="text-gray-500">Fin</p>
            <p className="font-medium">{investment.endDate}</p>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <button
            onClick={toggleInvestmentStatus}
            className={`p-2 rounded ${
              investment.status === "active"
                ? "bg-gray-100 text-gray-600"
                : "bg-green-100 text-green-600"
            } hover:opacity-80`}
            title={
              investment.status === "active"
                ? "Liquidar inversión"
                : "Reactivar inversión"
            }
          >
            {investment.status === "active" ? (
              <Pause size={16} />
            ) : (
              <Play size={16} />
            )}
          </button>
          <button
            onClick={openEditInvestmentModal}
            className="p-2 bg-yellow-100 text-yellow-600 rounded hover:opacity-80"
            title="Editar inversión"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={openDeleteConfirmation}
            className="p-2 bg-red-100 text-red-600 rounded hover:opacity-80"
            title="Eliminar inversión"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardInvestment;
