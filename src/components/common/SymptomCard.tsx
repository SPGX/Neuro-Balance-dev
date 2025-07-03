import React from 'react';
import { FaEye } from 'react-icons/fa';

type SymptomCardProps = {
    image: string;
    title: string;
    consultedCount?: number;
    viewCount?: number;
    onClick?: () => void;
};

export default function SymptomCard({
    image,
    title,
    consultedCount = 0,
    viewCount = 0,
    onClick,
}: SymptomCardProps) {
    return (
        <div
            onClick={onClick}
            className="w-[400px] h-[414px] bg-white rounded-[40px] p-6 flex flex-col shadow-[0_4px_30px_rgba(0,0,0,0.08)] relative cursor-pointer transition hover:shadow-lg"
        >
            {/* Image */}
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-[24px]"
            />

            {/* Text */}
            <div className="mt-4 flex flex-col">
                <h3 className="text-[20px] font-semibold text-gray-900 mb-2 leading-tight">
                    {title}
                </h3>

                <div className="text-sm text-gray-600 flex items-center gap-2">
                    <span>รับคำปรึกษา</span>
                    <span className="font-medium text-gray-700">{consultedCount.toLocaleString()} คน</span>
                    <span className="flex items-center gap-1">
                        <FaEye className="text-gray-500" />
                        {viewCount.toLocaleString()}
                    </span>
                </div>
            </div>

            {/* Action Button */}
            <div className="absolute bottom-6 right-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg shadow-md">
                    →
                </div>
            </div>
        </div>
    );
}
