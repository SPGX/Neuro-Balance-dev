import React, { ReactNode } from 'react'

export type Stat = { value: string; label: string }

type Props = {
    eyebrow?: string
    title: string
    description: ReactNode
    image: string
    reverse?: boolean
    stats?: Stat[]
    partners?: string[]
    className?: string
}

export default function SplitSection({
    eyebrow,
    title,
    description,
    image,
    reverse = false,
    stats,
    partners,
    className = '',
}: Props) {
    return (
        <div
            className={`
        bg-white overflow-hidden
        grid grid-cols-1
        md:flex ${reverse ? 'md:flex-row-reverse justify-between md:pl-6' : 'md:flex-row justify-between'}
        ${className}
    `}
        >
            {/* รูปภาพ desktop */}
            <div className="relative w-full max-w-[603px] md:w-1/2 min-h-[220px] mb-6 md:mb-0 hidden md:block">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                />
            </div>

            {/* เนื้อหา */}
            <div className="w-full md:w-2/3 flex flex-col justify-center pt-0 md:px-8 pb-10">
                {eyebrow && (
                    <h5 className="text-title-20-teal mb-2 order-1">{eyebrow}</h5>
                )}

                <h2 className="text-title-32-black mb-4 order-2">{title}</h2>

                {/* รูปภาพ mobile */}
                <div className="relative w-full min-h-[220px] mb-6 md:hidden order-3">
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                </div>

                <div className="text-body-20-regular mb-8 order-4">{description}</div>

                {stats?.length ? <StatsGrid stats={stats} className="mb-10 order-5" /> : null}
                {partners?.length ? (
                    <div className="order-6">
                        <span className="text-body-20-regular mb-3 block">
                            พาร์ทเนอร์ของเรา
                        </span>
                        <div className="w-full h-full grid grid-cols-3 sm:grid-cols-6 gap-4 place-items-center">
                            {partners.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`partner-${i}`}
                                    className="object-contain h-full grayscale hover:grayscale-0 transition"
                                />
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>

    )
}

function StatsGrid({
    stats,
    className = '',
}: {
    stats: Stat[]
    className?: string
}) {
    return (
        <div className={`grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-1 md:grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}>
            {stats.map(({ value, label }) => (
                <div
                    key={label}
                    className="flex flex-col items-center justify-center text-center border-2 border-tealPrimary/15 rounded-2xl py-6 px-4"
                >
                    <span className="whitespace-nowrap overflow-hidden text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-teal-500 leading-tight w-full text-center">
                        {value}
                    </span>
                    <span className="text-body-20-medium mt-1">{label}</span>
                </div>
            ))}
        </div>
    )
}
