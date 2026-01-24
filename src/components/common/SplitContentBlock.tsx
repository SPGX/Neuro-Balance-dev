import parse from 'html-react-parser';

type SplitContentBlockProps = {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    reverse?: boolean;
};

export default function SplitContentBlock({
    eyebrow,
    title,
    description,
    image,
    reverse = false,
}: SplitContentBlockProps) {
    return (
        <div
            className={`grid md:grid-cols-12 gap-10 items-center ${reverse ? 'md:flex-row-reverse' : ''
                }`}
        >
            <div className="md:col-span-6 text-gray-800 text-[17px] leading-relaxed space-y-4">
                <p className="text-teal-500 font-semibold">{eyebrow}</p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-black">{title}</h2>
                <div>{parse(description)}</div>
            </div>
            <div className="md:col-span-6 flex justify-center">
                <img src={image || undefined} alt={title} className="max-w-full md:max-w-[480px]" />
            </div>
        </div>
    );
}
