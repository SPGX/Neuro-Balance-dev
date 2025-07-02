type Props = {
  title?: string
  description?: string
  icon?: string
  children?: React.ReactNode
  className?: string
}

export default function Card({ title, description, icon, children, className = '' }: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 text-center ${className}`}>
      {icon && <img src={icon} alt={title} className="h-16 mx-auto mb-4 object-contain" />}
      {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
      {description && <p className="text-gray-600 mb-4">{description}</p>}
      {children}
    </div>
  )
}