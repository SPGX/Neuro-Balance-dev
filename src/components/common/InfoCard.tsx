import React from 'react';

type InfoCardProps = {
    title: string;
    description?: string;
    image?: string;
    icon?: React.ReactNode;
    footer?: React.ReactNode;
    layout?: 'vertical' | 'horizontal';
    onClick?: () => void;
    variant?: 'standard' | 'compact' | 'neuro' | 'highlight';
};

export default function InfoCard({
    title,
    description,
    image,
    icon,
    footer,
    layout = 'vertical',
    onClick,
    variant = 'standard',
}: InfoCardProps) {
    const isCompact = variant === 'compact';
    const isHorizontal = layout === 'horizontal';
    const isNeuro = variant === 'neuro';
    const isStandard = variant === 'standard';
    const isHighlight = variant === 'highlight';

    return (
        <div
            onClick={onClick}
            className={`
        bg-white 
        ${isHighlight ? 'rounded-[32px] p-6 md:p-8 max-w-[400px] relative shadow-md hover:shadow-lg' : ''}
        ${isNeuro ? 'rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-105' : ''}
        ${!isHighlight && !isNeuro ? 'rounded-xl shadow-md hover:shadow-lg' : ''}
        transition cursor-pointer overflow-hidden w-full mx-auto 
        ${isCompact ? 'max-w-[270px]' : isNeuro ? 'max-w-[600px]' : isHighlight ? 'max-w-[400px]' : 'max-w-[360px]'}
        ${isHorizontal && !isNeuro && !isHighlight ? 'flex items-start gap-4 p-4' : (!isNeuro && !isHighlight ? 'flex flex-col p-6' : '')}
      `}
        >
            {/* === Highlight Card === */}
            {isHighlight ? (
                <>
                    {image && (
                        <img src={image} alt={title} className="w-[72px] h-[72px] object-contain mb-4" />
                    )}
                    <h3 className="text-[36px] font-semibold text-gray-900 leading-tight font-[Noto Sans Thai] mb-4">
                        {title}
                    </h3>
                    {description && (
                        <p className="text-gray-600 text-base leading-relaxed mb-6">{description}</p>
                    )}
                    {footer && (
                        <div className="absolute bottom-6 right-6">
                            {footer}
                        </div>
                    )}
                </>
            ) : isNeuro ? (
                <>
                    <div className="flex items-center gap-6 mb-4">
                        {image && <img src={image} alt={title} className="w-24 h-24 object-contain" />}
                        <h3 className="text-xl font-semibold text-teal-600">{title}</h3>
                    </div>
                    {description && (
                        <p className="text-gray-700 text-base leading-relaxed mb-6">{description}</p>
                    )}
                    {footer && <div>{footer}</div>}
                </>
            ) : (
                <>
                    {(image || icon) && (
                        <div className={`${isHorizontal ? '' : 'mb-4'} flex-shrink-0`}>
                            {image ? (
                                <img
                                    src={image}
                                    alt={title}
                                    className={`
                    ${isCompact || isHorizontal || isStandard ? 'w-14 h-14' : 'h-24 w-auto mx-auto'}
                    object-contain
                  `}
                                />
                            ) : (
                                <div className="text-3xl">{icon}</div>
                            )}
                        </div>
                    )}

                    <div
                        className={`
              ${isHorizontal ? 'flex-1' : ''}
              ${isStandard || isCompact ? 'text-left' : 'text-center'}
              text-gray-800
            `}
                    >
                        <h3 className={`font-semibold mb-2 ${isCompact ? 'text-base' : 'text-lg'}`}>
                            {title}
                        </h3>
                        {description && (
                            <p
                                className={`text-gray-600 ${isCompact ? 'text-sm' : 'text-base'} leading-snug`}
                            >
                                {description}
                            </p>
                        )}
                        {footer && (
                            <div className={`${isHorizontal || isStandard ? 'mt-4 text-left' : 'mt-6'}`}>
                                {footer}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
