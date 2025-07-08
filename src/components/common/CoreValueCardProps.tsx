import React from 'react';
import classNames from 'classnames';

type Button = {
    text: string;
    variant?: 'primary' | 'outline';
    onClick?: () => void;
};

type Props = {
    title: string
    description: string
    image: string
    buttons?: Button[]
    className?: string
}

export default function CoreValueCard({
    title,
    description,
    image,
    buttons = [],
}: Props) {
    return (
        <div
            className="relative h-[600px] w-full"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-30 transition" />
            <div className="relative z-20 text-white text-center px-4 pt-16 md:pt-24">
                <h2 className="text-3xl font-bold mb-2">{title}</h2>
                <p className="text-sm opacity-90">{description}</p>
            </div>
        </div>
    );
}
