import React from 'react';
import Breadcrumb from '../Breadcrumb';

interface ArticleBannerProps {
    imageUrl: string;
    title: string;
    subTitle?: string;
    firstBreadcrumb?: string;
}

export default function ArticleBanner({ imageUrl, title, subTitle, firstBreadcrumb }: ArticleBannerProps) {
    return (
        <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] border sm:mt-10 mt-10">
            {firstBreadcrumb && <div className="absolute mt-11 md:mx-16 inset-0 z-10 mx-0 " >
                <Breadcrumb path={[firstBreadcrumb, title]} isBanner />
            </div>}
            <div
                className="
                    absolute top-0 left-0 w-full h-1/4 z-20 pointer-events-none
                    bg-gradient-to-b from-black/55 via-black/10 to-transparent
                "
                aria-hidden
            />
            <img
                src={imageUrl}
                alt={title}
                className="absolute left-0 w-screen lg:[700px] md:h-[700px] h-[300px] max-h-[1440px] object-cover object-center"
            />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center z-10">
                <h1 className="mt-16 sm:mt-0 text-2xl md:text-5xl sm:text-3xl font-bold leading-tight drop-shadow-md">
                    {title}
                </h1>
                {subTitle && (
                    <p className="mt-4 text-lg md:text-2xl font-light drop-shadow-sm max-w-3xl">
                        {subTitle}
                    </p>
                )}
            </div>
        </div>
    );
}
