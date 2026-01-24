import React from 'react';
import NeuroCard from './NeuroCard';
import parse from 'html-react-parser';

interface ActivityItem {
    id: number;
    title: string;
    subTitle: string;
    description: string;
    image: string;
}

interface SectionProps {
    titleTh: string;
    titleEng: string;
    activities: ActivityItem[];
    description: string;
}

const NeurofeedbackActivitiesSection: React.FC<SectionProps> = ({
    titleTh,
    titleEng,
    activities,
    description,
}) => {
    return (
        <section className="bg-white pt-20 space-y-10">
            <div className="text-center px-12 md:px-16">
                <p className="text-title-36-teal">{titleEng}</p>
                <h2 className="text-title-32-black">{titleTh}</h2>
                <h2 className="text-size-20 mt-2">{parse(description)}</h2>

            </div>

            <div className="space-y-10">
                {activities.map((item, index) => (
                    <NeuroCard
                        key={item.id}
                        title={item.title}
                        subTitle={item.subTitle}
                        description={item.description}
                        image={item.image}
                        reverse={index % 2 === 1}
                    />
                ))}
            </div>

        </section>
    );
};

export default NeurofeedbackActivitiesSection;