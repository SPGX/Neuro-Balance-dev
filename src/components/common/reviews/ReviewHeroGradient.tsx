import React from 'react';

type Props = { className?: string };

export default function ReviewHeroGradient({ className = '' }: Props) {
    return (
        <section className={`relative w-full flex items-center min-h-[520px] md:min-h-[640px] ${className}`}>
            <picture className="absolute inset-0">
                <source media="(max-width: 767px)" srcSet="/images/review-mobile.svg" />
                <img
                    src="/images/reviews.png"
                    alt=""
                    className="w-full h-full object-cover md:object-center object-[center_30%]"
                    aria-hidden
                />
            </picture>

            <div className="relative w-full"></div>
        </section>
    );
}
