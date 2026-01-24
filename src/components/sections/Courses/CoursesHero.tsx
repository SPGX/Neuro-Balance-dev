type Props = {
    image?: string;
};

export default function CoursesHero({ image }: Props) {
    return (
        <section className="w-full">
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-b-[60px] shadow-inner">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: image ? `url(${image})` : undefined,
                    }}
                />
            </div>
        </section>
    );
}
