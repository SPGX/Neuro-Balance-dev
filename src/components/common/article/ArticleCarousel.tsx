import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { fetchArticleList } from '../../../lib/api';
import { getImageUrl, formatThaiShort } from '../../utils/image';
import { useNavigate } from 'react-router-dom';

type ApiArticle = {
    id: number;
    documentId: string;
    title: string;
    content?: string | null;
    publishedAt?: string;
    banner?: { image?: any; title?: string } | null;
    viewCountAndSocial?: { viewed?: number } | null;
};

const CONTAINER = 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8';

export default function ArticleCarousel() {
    const [articles, setArticles] = useState<ApiArticle[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await fetchArticleList();
            setArticles(Array.isArray(res?.data) ? res.data : []);
        })();
    }, []);

    if (articles.length === 0) return <div className={`${CONTAINER} py-8 text-center`}>กำลังโหลด...</div>;

    const next = () => setCurrentIndex((p) => (p + 1) % articles.length);
    const prev = () => setCurrentIndex((p) => (p - 1 + articles.length) % articles.length);

    const a = articles[currentIndex];
    const img = getImageUrl(a?.banner?.image, 'large');
    const date = formatThaiShort(a?.publishedAt);
    const viewed = a?.viewCountAndSocial?.viewed ?? 0;
    const title = a?.banner?.title ?? a?.title ?? '';
    const handleOpen = () => navigate(`/article/${a.documentId}`);

    return (
        <section className={`${CONTAINER} py-8 relative`}>
            <div className="relative rounded-[30px] overflow-hidden shadow-lg w-full h-[300px] md:h-[500px] lg:h-[600px]">
                <img src={img} alt={title} className="absolute inset-0 w-full h-full object-cover" />

                <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur p-6">
                    <p className="text-sm font-bold text-tealPrimary bg-[#0FC1A126] px-[10px] py-[5px] rounded-[10px] mb-1 w-fit">Blog</p>
                    <h2 className="text-base md:text-3xl font-extrabold text-black mb-2 line-clamp-2">{title}</h2>
                    {a?.content ? (
                        <p className="text-gray-600 line-clamp-2 md:line-clamp-3" dangerouslySetInnerHTML={{ __html: a.content }} />
                    ) : null}
                    <div className="text-sm text-gray-500 mt-2 flex items-center gap-3">
                        <span>{date}</span>
                        <Eye className="w-4 h-4" />
                        <span>{viewed.toLocaleString()}</span>
                    </div>
                </div>

                <button
                    onClick={handleOpen}
                    aria-label="อ่านบทความ"
                    className="absolute bottom-4 right-4 w-8 h-8 md:bottom-6 md:right-6 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-white grid place-items-center shadow-md"
                >
                    <img src="/icons/ArrowRight.svg" alt="Arrow Right" className="w-3 h-3 md:w-4 md:h-4" />
                </button>
            </div>

            <div className="flex justify-center items-center mt-4 gap-4">
                <button
                    onClick={prev}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-tealPrimary hover:text-tealPrimary"
                    aria-label="ก่อนหน้า"
                >
                    <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                    {articles.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all ${i === currentIndex ? 'w-6 h-2 rounded-full bg-tealPrimary border-none' : 'w-2.5 h-2.5 rounded-full border border-tealPrimary bg-white'}`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-tealPrimary hover:text-tealPrimary"
                    aria-label="ถัดไป"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}
