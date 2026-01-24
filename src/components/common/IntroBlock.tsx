import React from 'react'
import parse from 'html-react-parser';

type IntroBlockProps = {
    title: string
    icon: string
    description: string
}

export default function IntroBlock({ title, icon, description }: IntroBlockProps) {
    return (
        <section className="w-full bg-white mx-auto pl-6 pr-6 lg:pr-0 md:pl-11 md:pr-11 2xl:pl-48">
            <div className="flex flex-col md:flex-row items-center justify-between gap-9">
                <div className="text-size-20 font-medium leading-relaxed md:flex-1">
                    <h2 className="text-size-32 font-bold mb-4">{title}</h2>
                    {parse(description)}
                </div>

                <div className="hidden lg:flex justify-end items-center md:w-auto">
                    <img
                        src={icon}
                        alt="Intro icon"
                        className="h-full max-h-[540px] w-auto object-contain pt-20"
                    />
                </div>
            </div>
        </section>
    )
}
