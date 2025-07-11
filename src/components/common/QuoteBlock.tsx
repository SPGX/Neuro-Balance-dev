type QuoteBlockProps = {
    children: React.ReactNode
}

export default function QuoteBlock({ children }: QuoteBlockProps) {
    return (
        <div className="text-center px-4 py-12">
            <div className="relative inline-block">
                <div className="text-2xl text-blue-500 font-bold -mb-3">“</div>
                <div className="border-t border-blue-100 w-40 mx-auto mb-4" />
                <div className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                    {children}
                </div>
                <div className="border-t border-blue-100 w-40 mx-auto mt-4" />
                <div className="text-2xl text-blue-500 font-bold -mt-3">”</div>
            </div>
        </div>
    )
}
