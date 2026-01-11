interface CardSummaryProps {
  title: string
  subtitle: string
  total: number
  totalAmount: number
}

function CardSummary({ title, subtitle, total, totalAmount }: CardSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>{subtitle}</span>
          <span className="font-medium">{total}</span>
        </div>
        <div className="flex justify-between">
          <span>Monto Total</span>
          <span className="font-medium">${totalAmount}</span>
        </div>
      </div>
    </div>
  )
}

export default CardSummary