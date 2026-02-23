import parse from 'html-react-parser';

type OverviewBlockProps = {
    description: string;
    image: string | null;
};

export default function OverviewBlock({ description, image }: OverviewBlockProps) {
    return (
        <section className="max-w-[1440px] mx-auto px-6 pb-20">
            {image && (
                <div className="flex items-center justify-center py-10">
                    <img
                        src={image}
                        alt="Overview"
                        className="max-w-full md:max-w-[300px] h-auto"
                    />
                </div>
            )}
            <div className="relative mx-auto max-w-[1280px] rounded-[32px] p-[3px] bg-gradient-to-t from-[#0FC1A1] via-[#90e0ab6d] to-transparent">
                <div className="bg-white rounded-[29px] px-14 md:p-16 text-center">
                    <div className="text-size-20 leading-relaxed">
                        {parse(description)}
                    </div>
                </div>
            </div>
        </section>
    );
}
