import React from 'react'

type IntroBlockProps = {
    title: string
    icon: string
    paragraphs: string[]
}

export default function IntroBlock({ title, icon, paragraphs }: IntroBlockProps) {
    return (
        <section className="bg-white max-w-[1440px] mx-auto px-4 md:px-10 py-16 md:py-24">
            <div className="grid md:grid-cols-12 gap-10 items-center">
                <div className="md:col-span-10 space-y-6 text-gray-800 text-[17px] leading-relaxed">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
                    {paragraphs.map((text, idx) => (
                        <p key={idx} dangerouslySetInnerHTML={{ __html: text }} />
                    ))}
                </div>

                <div className="md:col-span-2 flex justify-center md:justify-end">
                    <img src={icon} alt="Intro icon" className="w-28 md:w-32 lg:w-40 self-center" />
                </div>
            </div>
        </section>
    )
}
