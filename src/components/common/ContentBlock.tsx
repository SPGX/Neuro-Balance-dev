import Breadcrumb from "./Breadcrumb"

type ContentBlockProps = {
    variant?: 'default' | 'hero'
    title?: string
    subtitle?: string
    bgImage?: string
    label?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    children?: React.ReactNode
    className?: string,
    isBanner?: boolean,
    hideBgTitle?: boolean,
    positionTitle?: 'left' | 'center' | 'right',
    subtitleBelow?: string
}

export default function ContentBlock({
    variant = 'default',
    title,
    subtitle,
    bgImage,
    label,
    size = 'md',
    children,
    className = '',
    isBanner = false,
    hideBgTitle = false,
    positionTitle,
    subtitleBelow
}: ContentBlockProps) {
    if (variant === 'hero') {
        const headingSize =
            size === 'sm' ? 'text-3xl'
                : size === 'md' ? 'text-5xl'
                    : size === 'lg' ? 'text-6xl'
                        : 'text-5xl sm:text-7xl'

        const height =
            size === 'sm' ? 'h-[220px]'
                : size === 'md' ? 'h-[320px]'
                    : size === 'lg' ? 'h-[clamp(370px,2vw+362px,420px)]'
                        : 'h-[clamp(256px,20vw+200px,698px)]'

        const titlePosition =
            positionTitle === "left" ? "self-center text-center md:self-start md:text-left"
                : positionTitle === "right" ? "self-center text-center md:self-end md:text-right"
                    : "self-center text-center";

        return (
            <section className="w-full max-w-[1440px] mx-auto">
                <div
                    className={`
                        relative w-full ${height} rounded-3xl overflow-hidden
                        flex flex-col items-center justify-center text-center px-6
                        ${className}
                    `}
                >

                    {isBanner && <div className="absolute mt-5 mx-5 md:mx-9 inset-0 z-20" >
                        <Breadcrumb path={[title ?? '', ""]} isBanner={isBanner}/>
                    </div>}

                    {bgImage && (
                        
                        <img
                            src={bgImage}
                            alt={title || ''}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    )}
                    {(label || title) &&<div className={`absolute inset-0 ${hideBgTitle ? "" :"bg-black/30"}`} />}

                    {label && (
                        <span className="relative z-10 text-subheading-24-white mb-1">
                            {label}
                        </span>
                    )}

                    {title && (
                        <h1 className={`relative z-10 ${headingSize} ${titlePosition} ${subtitleBelow ? "text-[#0F9C83] ": "text-title-96-gradient"}`} >
                            <span className={`${subtitleBelow ? "text-24" : ""}`}>{title}</span>
                            {subtitleBelow && (
                                <span className="block mt-4 bg-gradient-to-r from-[#1D2126] to-[#548279] bg-clip-text text-transparent text-48 sm:text-64">{subtitleBelow}</span>
                            )}
                        </h1>

                    )}

                    {subtitle && (
                        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 
                                      text-white text-xs sm:text-lg md:text-xl 
                                      max-w-[90%] md:max-w-[60%] w-full leading-snug text-center"
                        >
                            {subtitle}
                        </p>
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
