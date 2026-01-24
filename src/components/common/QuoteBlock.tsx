import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from "react-icons/bi";

type QuoteBlockProps = {
    children: React.ReactNode
}

export default function QuoteBlock({ children }: QuoteBlockProps) {
    return (
        <div className="text-center px-4 py-0 md:py-12">
            <div className="flex flex-col items-center gap-4">
                <div className="relative flex items-center w-full max-w-[270px] mb-6">
                    <BiSolidQuoteAltLeft
                        className="absolute -left-3 text-lightBlue bg-white pr-1"
                        style={{ fontSize: "clamp(0.75rem, 2vw, 1.25rem)" }}
                    />
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-lightBlue to-transparent" />
                </div>
                <div className="text-xl md:text-2xl font-semibold text-gray-800 leading-relaxed">
                    {children}
                </div>
                <div className="relative flex items-center w-full max-w-[270px] mt-6">
                    <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-lightBlue" />
                    <BiSolidQuoteAltRight
                        className="absolute -right-3 text-lightBlue bg-white pl-1"
                        style={{ fontSize: "clamp(0.75rem, 2vw, 1.25rem)" }}
                    />
                </div>
            </div>
        </div>

    )
}
