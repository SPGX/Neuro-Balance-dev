import React from 'react';
import parse from 'html-react-parser';

interface ActivityCardProps {
    title: string;
    subTitle: string;
    description: string;
    imageUrl: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ title, subTitle, description, imageUrl }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 w-full">
                <img src={imageUrl} alt={title} className="w-full max-w-xs mx-auto" />
            </div>
            <div className="md:w-1/2 w-full text-left flex flex-col justify-center">
                <h4 className="text-primary text-lg font-bold mb-1">{title}</h4>
                <h3 className="text-xl font-semibold mb-2">{subTitle}</h3>
                <div className="text-gray-700 leading-relaxed mb-4">
                    {parse(description)}
                </div>
                <button className="self-start px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition">
                    รายละเอียด →
                </button>
            </div>
        </div>
    );
};

export default ActivityCard;
