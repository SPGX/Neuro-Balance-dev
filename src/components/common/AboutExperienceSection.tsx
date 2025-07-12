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

            <div className="flex flex-col justify-center pt-0 px-8 pb-8 md:max-w-xl">
                {eyebrow && (
                    <h5 className="text-heading-green-bold mb-2">{eyebrow}</h5>
                )}

                <h2 className="text-title-main-bold mb-4">{title}</h2>

                <div className="text-description mb-8">{description}</div>

                {stats?.length ? <StatsGrid stats={stats} className="mb-10" /> : null}
                {partners?.length ? (
                    <>
                        <span className="text-title-sm-bold mb-3">
                            พาร์ทเนอร์ของเรา
                        </span>
                        <div className="grid max-w-md">
                            {partners.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`partner-${i}`}
                                    className="object-contain grayscale hover:grayscale-0 transition"
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
        <div className={`grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-md ${className}`}>
            {stats.map(({ value, label }) => (
                <div
                    key={label}
                    className="flex flex-col items-center justify-center text-center border rounded-lg py-6 w-full min-w-fit"
                >
                    <span className="text-title-green break-words px-2">{value}</span>
                    <span className="text-description mt-1">{label}</span>
                </div>
            ))}
        </div>
    )
}
