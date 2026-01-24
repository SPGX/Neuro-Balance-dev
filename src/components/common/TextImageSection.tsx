import React from 'react';
import parse from 'html-react-parser';

interface TextImageSectionProps {
    sectionTitleTh: string;
    sectionTitleEng: string;
    contentHtml: string;
    imageUrl?: string;
    reverse?: boolean;
}

const TextImageSection: React.FC<TextImageSectionProps> = ({
    sectionTitleTh,
    sectionTitleEng,
    contentHtml,
    imageUrl,
    reverse = false,
}) => {
    return (
        <section className="w-full h-full bg-gradient-to-b from-[#E5FAF7] to-white overflow-hidden">
            {imageUrl && <div className="h-full hidden lgMid:block absolute w-[495px] mt-28 ">
                <img
                    src={imageUrl}
                    alt={sectionTitleTh}
                    className="w-full max-w-none object-cover object-left lgMid:h-[660px] "
                />
            </div>}
            <div className="lgMid:ml-[370px] lgMid:w-[710px] mx-auto text-center">
                <span className="block">
                    <p className="text-title-24-teal mb-2 mt-20">{sectionTitleEng}</p>
                    <h2 className="text-title-36-black">{sectionTitleTh}</h2>
                    <div className="h-px w-full max-w-[600px] mx-auto my-6 bg-[linear-gradient(90deg,#90E0AB00,#0FC1A1,#106EE8,#0FC1A1,#90E0AB00)]"></div>
                </span>
            </div>
            <div
                className={`grid grid-cols-1 lgMid:grid-cols-[auto,1fr] items-start w-full ${reverse ? 'lgMid:grid-cols-[1fr,auto]' : ''}`}
            >
                <span className='w-[500px]'></span>

                {/* Text Section */}
                <div className="w-full px-6 lgMid:pr-16 pb-12 place-items-center min-h-[550px] ">        
                    <div className="text-size-20 leading-relaxed font-normal">
                        {parse(contentHtml)}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TextImageSection;
