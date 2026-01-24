import { Eye } from 'lucide-react';
import { getImageUrl, formatThaiShort } from '../../utils/image';
import { useNavigate } from 'react-router-dom';

type ApiArticle = {
    id: number;
    documentId: string;
    title: string;
    publishedAt?: string;
    banner?: { image?: any; title?: string } | null;
    viewCountAndSocial?: { viewed?: number } | null;
};

type Props = { articles: ApiArticle[] };

const CONTAINER = 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8';
const TAG_CLS = 'text-[#0FC1A1] font-bold text-xs md:text-sm';
const TITLE_CLS = 'font-bold text-blackText mt-1 line-clamp-2 text-base md:text-lg';

export default function FeaturedArticleSection({ articles }: Props) {
    if (!Array.isArray(articles) || articles.length === 0) return null;

    const navigate = useNavigate();
    const [main, ...others] = articles;

    const open = (docId?: string) => {
        if (!docId) return;
        navigate(`/article/${docId}`);
    };

    const MainCard = () => {
        const hasDoc = !!main.documentId;
        return (
            <div className="flex-1 min-w-0 max-w-[933px] w-full bg-white rounded-2xl shadow overflow-hidden flex flex-col relative">
                <div className="relative aspect-[4/3] w-full">
                    <img
                        src={getImageUrl(main.banner?.image, 'large')}
                        alt={main.banner?.title ?? main.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                    />
                </div>

                <div className="p-4 flex flex-col gap-2">
                    <p className={TAG_CLS}>Blog</p>
                    <h3 className={TITLE_CLS}>{main.banner?.title ?? main.title}</h3>
                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                        <span>{formatThaiShort(main.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {(main.viewCountAndSocial?.viewed ?? 0).toLocaleString()}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => open(main.documentId)}
                    className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white text-sm shadow-md z-10 ${hasDoc ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                    aria-label={hasDoc ? 'อ่านบทความ' : 'ลิงก์ไม่พร้อม'}
                    disabled={!hasDoc}
                    title={hasDoc ? '' : 'ยังไม่มี documentId'}
                >
                    <img src="/icons/ArrowRight.svg" alt="Arrow Right" className="w-4 h-4" />
                </button>
            </div>
        );
    };

    return (
        <section className={`${CONTAINER} mb-12`}>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <MainCard />
                <div className="flex flex-col gap-6 max-w-[933px] lg:max-w-[461px] w-full">
                    {others.slice(0, 2).map((item) => {
                        const hasDoc = !!item.documentId;
                        return (
                            <div key={item.id} className="bg-white rounded-2xl shadow overflow-hidden flex flex-col relative">
                                <div className="relative aspect-[3/2] w-full">
                                    <img
                                        src={getImageUrl(item.banner?.image, 'medium')}
                                        alt={item.banner?.title ?? item.title}
                                        className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                                    />
                                </div>

                                <div className="p-4 flex flex-col justify-between flex-grow">
                                    <div>
                                        <p className={TAG_CLS}>Blog</p>
                                        <h4 className={`${TITLE_CLS} leading-snug`}>{item.banner?.title ?? item.title}</h4>
                                    </div>

                                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                                        <span>{formatThaiShort(item.publishedAt)}</span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {(item.viewCountAndSocial?.viewed ?? 0).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => open(item.documentId)}
                                    className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white text-sm shadow-md z-10 ${hasDoc ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                                    aria-label={hasDoc ? 'อ่านบทความ' : 'ลิงก์ไม่พร้อม'}
                                    disabled={!hasDoc}
                                    title={hasDoc ? '' : 'ยังไม่มี documentId'}
                                >
                                    <img src="/icons/ArrowRight.svg" alt="Arrow Right" className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
