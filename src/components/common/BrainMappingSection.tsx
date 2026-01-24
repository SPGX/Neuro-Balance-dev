import React from 'react';
import parse from 'html-react-parser';

interface BrainMappingSectionProps {
    sectionTitleTh: string;
    sectionTitleEng: string;
    contentHtml: string;
    imageUrl?: string;
}

const BrainMappingSection: React.FC<BrainMappingSectionProps> = ({
    sectionTitleTh,
    sectionTitleEng,
    contentHtml,
    imageUrl,
}) => {
    return (
        <section className="w-full overflow-hidden">
            <div
                className="
                    flex flex-col lg:flex-row
                    items-start lg:items-center
                    justify-start
                    px-4 sm:px-8 lg:px-16
                    py-8 sm:py-12
                    gap-6 lg:gap-0
                    min-h-[auto] lg:min-h-[560px]
                "
            >
                {/* Text Section */}
                <div className="flex-1 flex justify-center lg:justify-end h-auto lg:h-full">
                    <div className="w-full lg:max-w-none pr-0 text-center lg:text-left">
                        <p className="text-title-24-teal mb-2">
                            {sectionTitleEng}
                        </p>
                        <h2 className="text-title-36-black mb-4">
                            {sectionTitleTh}
                        </h2>
                        <div className="text-size-20 leading-relaxed">
                            {parse(contentHtml)}
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                {imageUrl && (
                    <div className="flex-shrink-0 flex items-center justify-center lg:justify-start mt-6 lg:mt-0">
                        <img
                            src={imageUrl}
                            alt={sectionTitleTh}
                            className="
                                w-[80%] sm:w-[70%] md:w-[420px] lg:w-[564px]
                                h-auto lg:h-[560px]
                                object-contain
                            "
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default BrainMappingSection;
