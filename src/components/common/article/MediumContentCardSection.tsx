import React from 'react';
import parse from 'html-react-parser';

interface MarkDownWithRef {
    id: number;
    content: string;
    ref?: string;
}

interface AdditionImage {
    id: number;
    url: string;
}

interface ImageContent {
    id: number;
    titleTop?: string;
    titleBelow?: string;
    number?: string;
    description?: string;
    image?: string;
}

interface MediumCardVM {
    id: number;
    additionImage?: AdditionImage[];
    MarkDownWithRef: MarkDownWithRef[];
    imageContent?: ImageContent | null;
}

interface Props {
    cards: MediumCardVM[];
}

export default function MediumContentCardSection({ cards }: Props) {
    return (
        <div className="space-y-12 md:space-y-20 max-w-[1440px] mx-auto">
            {cards.map((card, index) => {
                const isReversed = index % 2 === 1;
                const imageUrl = card.imageContent?.image || card.additionImage?.[0]?.url || '';

                return (
                    <div
                        key={card.id}
                        className="grid grid-cols-none lg:grid-cols-12 gap-10 items-stretch"
                    >
                        <div className={`xl:col-span-4 lg:col-span-6 ${isReversed ? 'lg:order-2' : ''}`}>
                            <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                                {imageUrl ? (
                                    <img src={imageUrl} alt="" className="w-full h-full object-cover block" />
                                ) : (
                                    <div className="w-full h-[240px] bg-gray-200" />
                                )}

                                <div className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(180deg,rgba(0,0,0,0)_30%,rgba(0,0,0,0.28)_70%,rgba(0,0,0,0.42)_100%)]" />

                                {card.imageContent?.titleTop && (
                                    <div className="absolute z-10 top-4 left-4 font-sans font-semibold text-[clamp(14px,1.5vw,20px)] leading-[100%] text-white/70 drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
                                        {card.imageContent.titleTop}
                                    </div>
                                )}

                                {card.imageContent?.titleBelow && (
                                    <div className="absolute z-10 left-4 bottom-[112px] lg:left-[30px] lg:bottom-[170px] px-3 py-1.5 rounded-lg font-sans font-medium text-[clamp(16px,2vw,24px)] leading-[100%] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
                                        {card.imageContent.titleBelow}
                                    </div>
                                )}

                                {card.imageContent?.number && (
                                    <div className="absolute z-10 left-4 bottom-16 lg:bottom-[64px] px-3 py-1.5 rounded-lg font-sans font-extrabold text-[clamp(48px,7vw,96px)] leading-[100%] text-white drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
                                        {card.imageContent.number}
                                    </div>
                                )}

                                {card.imageContent?.description && (
                                    <div className="absolute z-10 left-4 bottom-4 px-3 py-1.5 rounded-lg font-sans font-semibold text-[clamp(16px,2vw,24px)] leading-[100%] text-[#57D7C0] drop-shadow-[0_2px_6px_rgba(0,0,0,.35)]">
                                        {card.imageContent.description}
                                    </div>
                                )}

                                <div className="absolute z-10 right-4 bottom-4 w-9 h-9 rounded-xl bg-black/35 backdrop-blur-[6px] grid place-items-center">
                                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.084 11.918L23.834 2.16797M23.834 2.16797H18.0449M23.834 2.16797V7.95703" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M23.8327 13.0013C23.8327 18.1082 23.8327 20.6616 22.2462 22.2481C20.6597 23.8346 18.1062 23.8346 12.9993 23.8346C7.89247 23.8346 5.33903 23.8346 3.75252 22.2481C2.16602 20.6616 2.16602 18.1082 2.16602 13.0013C2.16602 7.89442 2.16602 5.34098 3.75252 3.75447C5.33903 2.16797 7.89247 2.16797 12.9993 2.16797" stroke="white" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div
                            className={`xl:col-span-8 lg:col-span-6 flex flex-col justify-between space-y-6 ${isReversed ? 'lg:order-1' : ''
                                }`}
                        >
                            <div className="p-6 rounded-2xl text-[16px] space-y-8 leading-relaxed flex-1">
                                {card.MarkDownWithRef.map((block, i) => (
                                    <div key={block.id} className="space-y-4">
                                        {i > 0 && <hr className="border-t border-gray-300 my-4" />}
                                        {parse(block.content)}
                                        {block.ref && (
                                            <div className="mt-4 rounded-xl p-6 leading-relaxed text-[16px] bg-[#F5F9FF] text-[#106EE8]">
                                                {block.ref}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {Array.isArray(card.additionImage) && card.additionImage.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-0">
                                    {card.additionImage.map((img) => (
                                        <div
                                            key={img.id}
                                            className="bg-white p-4 lg:p-0 flex flex-col items-center text-center"
                                        >
                                            <img src={img.url} alt="" className="object-contain mb-2" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
