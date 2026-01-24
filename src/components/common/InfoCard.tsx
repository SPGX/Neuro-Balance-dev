import React, { ReactNode } from 'react';

type InfoCardProps = {
    title: string;
    description?: ReactNode;
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
        bg-white transition cursor-pointer overflow-hidden w-full mx-auto
        ${isHighlight ? 'rounded-[32px] p-6 md:p-8 shadow-md hover:shadow-lg max-w-[400px] flex flex-col h-full' : ''}
        ${isNeuro ? 'rounded-2xl p-8 shadow-md hover:shadow-xl hover:scale-105 max-w-[600px]' : ''}
        ${!isHighlight && !isNeuro ? 'rounded-xl shadow-md hover:shadow-lg flex flex-col p-6 max-w-[360px]' : ''}
        ${isCompact ? 'max-w-[270px]' : ''}
        ${isHorizontal && !isNeuro && !isHighlight ? 'flex-row items-start gap-4' : 'flex flex-col'}
        h-full
      `}
        >
            {isHighlight ? (
                <div className="flex flex-col justify-between flex-1 h-full">
                    <div className="flex-1">
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-[72px] h-[72px] object-contain mb-4"
                            />
                        )}
                        <h3 className="text-title-36-black-semi mb-4">{title}</h3>
                        <span className="text-body-24-regular">{description}</span>
                    </div>
                    {footer && <div className="mt-6 flex justify-end">{footer}</div>}
                </div>
            ) : isNeuro ? (
                <>
                    <div className="flex items-center gap-6 mb-4">
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-24 h-24 object-contain"
                            />
                        )}
                        <h3 className="text-xl font-semibold text-teal-600">{title}</h3>
                    </div>
                    {description}
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
              text-gray-800 flex flex-col justify-between h-full
            `}
                    >
                        <div>
                            <h3 className={`font-semibold mb-2 ${isCompact ? 'text-base' : 'text-lg'}`}>
                                {title}
                            </h3>
                            {description && (
                                <p className={`text-gray-600 ${isCompact ? 'text-sm' : 'text-base'} leading-snug`}>
                                    {description}
                                </p>
                            )}
                        </div>
                        {footer && <div className="mt-4 flex justify-end">{footer}</div>}
                    </div>
                </>
            )}
        </div>
    );
}
