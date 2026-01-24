import React from 'react';
import parse from 'html-react-parser';

interface NeuroCardProps {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    reverse?: boolean;
}

const NeuroCard: React.FC<NeuroCardProps> = ({
    title,
    subTitle,
    description,
    image,
    reverse = false,
}) => {
    return (
        <div
            className={`relative bg-[#F7F9F9] py-16 flex flex-col md:flex-row gap-6 ${reverse ? 'md:flex-row-reverse' : ''} px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40`}
        >
            <div className={`flex-1 relative ${reverse ? 'text-left  md:text-right' : 'text-left '}`}>
                <div className={`relative z-10 items-center`}>
                    <h3 className="text-title-48-teal">{title}</h3>
                    <p className="text-title-32-black mt-1 mb-3">{subTitle}</p>
                    <div className="text-size-20 text-base leading-relaxed">
                        {parse(description)}
                    </div>
                </div>
            </div>

            <div className={`w-full md:flex-1 flex ${reverse ? "justify-end" : "justify-start"} items-center z-10`}>
                <div className="rounded-[32px] overflow-hidden w-full max-w-[491px] max-h-[424px] mx-auto">
                    <img
                        src={image}
                        alt={title}
                        className="w-full object-contain"
                    />
                </div>
            </div>
        </div>
        // <div
        //     className={`relative bg-[#F2FFFF] p-11 flex flex-col md:flex-row gap-6 ${reverse ? 'md:flex-row-reverse rounded-r-2xl mr-6 ml-6 md:mr-28 sm:mx-0' : 'rounded-l-2xl mr-6 ml-6 md:ml-28 sm:mx-0'
        //         }`}
        // >
        //     <div className={`flex-1 relative ${reverse ? 'text-left md:pl-11 md:text-right' : 'text-left md:pr-11'}`}>
        //         <div className={`absolute ${reverse ? "top-0 left-0": "bottom-[-80px] left-[-80px]"} w-80 h-80 bg-[radial-gradient(circle_at_center,_#B2F5EA,_transparent)] opacity-60 blur-3xl z-0 pointer-events-none hidden md:block`}>
        //         </div>
        //         <div className="relative z-10">
        //             <h3 className="text-title-48-teal">{title}</h3>
        //             <p className="text-title-32-black mt-1 mb-3">{subTitle}</p>
        //             <div className="text-size-20 text-base leading-relaxed">
        //                 {parse(description)}
        //             </div>
        //             <button className="mt-6 inline-flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition">
        //                 รายละเอียด →
        //             </button>
        //         </div>
        //     </div>

        //     <div className="w-full md:flex-1 flex justify-center items-center z-10">
        //         <img
        //             src={image}
        //             alt={title}
        //             className="w-full max-w-md h-auto object-contain"
        //         />
        //     </div>
        //     <div className={`absolute ${reverse ?"bottom-[-80px] right-0" :"top-0 right-0"} w-80 h-80 bg-[radial-gradient(circle_at_center,_#B2F5EA,_transparent)] opacity-60 blur-3xl z-0 pointer-events-none hidden md:block`}></div>
        // </div>
    );
};

export default NeuroCard;
