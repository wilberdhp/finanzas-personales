interface CardSummaryTopProps {
  title: string;
  total: number;
  children: React.ReactNode;
  color: string
}

function CardSummaryTop({ title, children, total, color }: CardSummaryTopProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg bg-blue-100 ${color}`}>
          {children}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold">${total}</p>
        </div>
      </div>
    </div>
  );
}

export default CardSummaryTop;
