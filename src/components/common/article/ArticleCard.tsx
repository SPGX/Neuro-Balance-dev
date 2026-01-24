import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { getImageUrl, formatThaiShort } from '../../utils/image';

type ApiArticle = {
    id: number;
    documentId?: string;
    title: string;
    publishedAt?: string;
    banner?: { image?: any } | null;
    viewCountAndSocial?: { viewed?: number } | null;
};

type Props = {
    article: ApiArticle;
    variant?: 'large' | 'small';
    className?: string;
};

export default function ArticleCard({ article, variant = 'small', className = '' }: Props) {
    const hasSlug = !!article.documentId;
    const img = getImageUrl(article.banner?.image, variant === 'large' ? 'large' : 'medium');
    const date = formatThaiShort(article.publishedAt);
    const viewed = article.viewCountAndSocial?.viewed ?? 0;
    const aspect = variant === 'large' ? 'aspect-[4/3]' : 'aspect-[3/2]';
    const titleClass = variant === 'large' ? 'text-lg md:text-xl font-bold' : 'text-sm md:text-base font-bold';

    const CardInner = (
        <>
            <div className={`relative w-full ${aspect} bg-gray-50`}>
                <img
                    src={img}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).onerror = null; e.currentTarget.src = '/default-image.svg'; }}
                />
            </div>
            <div className="p-4 flex flex-col gap-2">
                <p className="text-[#0FC1A1] text-xs md:text-sm font-bold">Blog</p>
                <h3 className={`${titleClass} line-clamp-2`}>{article.title}</h3>
                <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                    <span>{date}</span>
                    <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {viewed.toLocaleString()}
                    </span>
                </div>
            </div>
            <div className="absolute bottom-4 right-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white text-sm shadow-md">
                    <img
                        src="/icons/ArrowRight.svg"
                        alt="Arrow Right"
                        className="w-4 h-4"
                    />
                </div>
            </div>
        </>
    );

    const classAll = `bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden relative flex flex-col ${className}`;

    return hasSlug ? (
        <Link to={`/article/${article.documentId}`} className={classAll} aria-label={article.title}>
            {CardInner}
        </Link>
    ) : (
        <div className={`${classAll} cursor-default`} aria-label={article.title}>
            {CardInner}
        </div>
    );
}
