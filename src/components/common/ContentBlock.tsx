type ContentBlockProps = {
    variant?: 'default' | 'hero'
    title?: string
    bgImage?: string
    label?: string
    size?: 'sm' | 'md' | 'lg'
    children?: React.ReactNode
    className?: string
}

export default function ContentBlock({
    variant = 'default',
    title,
    bgImage,
    label,
    size = 'md',
    children,
    className = '',
}: ContentBlockProps) {
    if (variant === 'hero') {
        const headingSize =
            size === 'sm' ? 'text-3xl'
                : size === 'md' ? 'text-5xl'
                    : 'text-6xl'

        const height =
            size === 'sm' ? 'h-[220px]'
                : size === 'md' ? 'h-[320px]'
                    : 'h-[420px]'

        return (
            <section className="w-full">
                <div
                    className={`
            relative w-full ${height} rounded-3xl overflow-hidden
            flex flex-col items-center justify-center text-center px-6
            ${className}
          `}
                >
                    {bgImage && (
                        <img
                            src={bgImage}
                            alt={title || ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/40" />

                    {label && (
                        <span className="relative z-10 text-teal-100 font-semibold mb-1">
                            {label}
                        </span>
                    )}
                    {title && (
                        <h1 className={`relative z-10 ${headingSize} font-extrabold text-white`}>
                            {title}
                        </h1>
                    )}
                </div>
            </section>
        )
    }
    return (
        <section className={`py-12 px-6 ${className}`}>
            {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
            {children}
        </section>
    )
}
