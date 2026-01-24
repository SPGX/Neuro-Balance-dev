import { Link } from 'react-router-dom';

type Props = {
    title: string;
    cards: {
        id: number;
        link: string;
        viewed: number;
        image: {
            url: string;
        };
    }[];
};

export default function ArticleRelateSection({ title, cards }: Props) {
    return (
        <section className="px-4 md:px-16 py-10">
            <h2 className="text-title-info-semi mb-6">{title}</h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {cards.map((card) => (
                    <Link
                        key={card.id}
                        to={card.link}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
                    >
                        <img
                            src={card.image?.url}
                            alt=""
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <p className="text-md-description mb-2 line-clamp-2">
                                {card.viewed.toLocaleString()} ผู้ชม
                            </p>
                            <p className="text-subtitle line-clamp-2 font-bold">
                                {card.link.replace('/asd/', '').replace(/-/g, ' ')}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
