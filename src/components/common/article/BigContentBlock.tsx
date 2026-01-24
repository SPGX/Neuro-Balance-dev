import React from 'react';
import parse from 'html-react-parser';

interface BigContentBlockItem {
    id: number;
    content: string;
    image: {
        url: string;
    };
}

interface Props {
    blocks: BigContentBlockItem[];
}

export default function BigContentBlock({ blocks }: Props) {
    return (
        <div className="space-y-24 max-w-[1440px] mx-auto">
            {blocks.map((block) => (
                <div
                    key={block.id}
                    className="bg-white rounded-3xl overflow-hidden"
                >
                    {/* HEADINGS */}
                    <div className="text-center py-8 bg-[#F7F7F7] px-4 md:px-10">
                        <div className="text-[16px] leading-relaxed space-y-4">
                            {parse(block.content)}
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div className="w-full">
                        <img
                            src={block.image.url}
                            alt=""
                            className="w-full h-auto object-cover rounded-3xl "
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
