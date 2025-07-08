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
        md:flex ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}
        ${className}
      `}
        >
            <div className="relative flex-1 min-h-[220px]">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover  rounded-2xl "
                />
            </div>

            <div className="flex flex-col justify-center p-8 md:max-w-xl">
                {eyebrow && (
                    <h5 className="text-teal-600 font-semibold mb-2">{eyebrow}</h5>
                )}

                <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">{title}</h2>

                <div className="leading-7 text-gray-600 mb-8">{description}</div>

                {stats?.length ? <StatsGrid stats={stats} className="mb-10" /> : null}
                {partners?.length ? (
                    <>
                        <h6 className="font-semibold text-gray-700 mb-3">
                            พาร์ทเนอร์ของเรา
                        </h6>
                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 max-w-md">
                            {partners.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`partner-${i}`}
                                    className="h-12 object-contain grayscale hover:grayscale-0 transition"
                                />
                            ))}
                        </div>
                    </>
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
        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-sm ${className}`}>
            {stats.map(({ value, label }) => (
                <div
                    key={label}
                    className="flex flex-col items-center border rounded-lg py-6"
                >
                    <span className="text-teal-600 text-3xl font-extrabold">{value}</span>
                    <span className="text-gray-500 mt-1">{label}</span>
                </div>
            ))}
        </div>
    )
}
