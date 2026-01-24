import React from 'react';
import classNames from 'classnames';

type Button = {
    text: string;
    variant?: 'primary' | 'outline';
    onClick?: () => void;
};

type Props = {
    title: string;
    description: string;
    image: string;
    buttons?: Button[];
    className?: string;
};

export default function CoreValueCard({
    title,
    description,
    image,
    buttons = [],
    className = '',
}: Props) {
    return (
        <div
            className={classNames(
                'relative w-full flex items-center justify-center',
                className
            )}
        >
            <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-opacity-30" />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center px-4 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
                <p className="text-sm md:text-base opacity-90 mb-6 leading-relaxed">
                    {description}
                </p>

                {buttons.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-4">
                        {buttons.map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={btn.onClick}
                                className={classNames(
                                    'px-6 py-2 rounded-full text-sm font-semibold transition',
                                    {
                                        'bg-white text-black hover:bg-gray-200': btn.variant === 'outline',
                                        'bg-teal-500 hover:bg-teal-600 text-white': btn.variant !== 'outline',
                                    }
                                )}
                            >
                                {btn.text}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
