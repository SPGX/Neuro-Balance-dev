import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchArticleList } from '../lib/api';
import FeaturedArticleSection from '../components/common/article/FeaturedArticleSection';
import ArticleGridSection from '../components/common/article/ArticleGridSection';
import ArticleCarousel from '../components/common/article/ArticleCarousel';
import Button from '../components/common/Button';

type Raw = Record<string, any>;

export type ApiArticle = {
    id: number;
    documentId: string;
    title: string;
    publishedAt?: string;
    banner?: { image?: any; title?: string } | null;
    viewCountAndSocial?: { viewed?: number } | null;
};

type GridArticle = {
    id: number;
    documentId: string;
    Title: string;
    date: string;
    viewd: number;
    image: { formats?: { small?: { url: string } }; url: string };
};

const CONTAINER = 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8';

function normalizeApiArticle(raw: Raw): ApiArticle {
    const n = raw?.article ?? raw;
    const title = n?.title ?? raw?.title ?? raw?.Card?.title ?? raw?.Title ?? '';
    const documentId = n?.documentId ?? raw?.documentId ?? raw?.slug ?? '';
    const publishedAt = n?.publishedAt ?? raw?.publishedAt ?? raw?.date ?? '';
    const image = n?.banner?.image ?? raw?.banner?.image ?? raw?.image ?? raw?.Card?.image ?? null;
    const bannerTitle = n?.banner?.title ?? raw?.banner?.title ?? undefined;
    const viewed =
        n?.viewCountAndSocial?.viewed ??
        raw?.viewCountAndSocial?.viewed ??
        raw?.Card?.viewed ??
        raw?.viewed ??
        0;

    return {
        id: Number(n?.id ?? raw?.id ?? Math.random() * 1e6),
        documentId,
        title,
        publishedAt,
        banner: { image, title: bannerTitle },
        viewCountAndSocial: { viewed },
    };
}

function toGrid(a: ApiArticle): GridArticle {
    return {
        id: a.id,
        documentId: a.documentId ?? '',
        Title: a.banner?.title ?? a.title ?? '',
        date: a.publishedAt ?? '',
        viewd: a.viewCountAndSocial?.viewed ?? 0,
        image: { ...(a.banner?.image ?? {}), url: a.banner?.image?.url ?? '/default-image.svg' },
    };
}

export default function ArticleListPage() {
    const location = useLocation();
    const [featuredArticles, setFeaturedArticles] = useState<ApiArticle[]>([]);
    const [allArticles, setAllArticles] = useState<GridArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const listRes = await fetchArticleList();
                const listRaw: Raw[] = Array.isArray(listRes?.data) ? listRes.data : [];
                const normalized: ApiArticle[] = listRaw.map(normalizeApiArticle);

                const TOP_N = 10;
                const featured = [...normalized]
                    .sort((a, b) => (b.viewCountAndSocial?.viewed ?? 0) - (a.viewCountAndSocial?.viewed ?? 0))
                    .slice(0, TOP_N);

                const all = normalized.map(toGrid).filter((x) => !!x.documentId);

                setFeaturedArticles(featured);
                setAllArticles(all);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!loading && location.hash === '#article-grid') {
            const el = document.getElementById('article-grid');
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [loading, location]);

    const scrollToAllArticles = () => {
        document.getElementById('article-grid')?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) return <div className={`${CONTAINER} p-8 text-center`}>กำลังโหลด...</div>;

    return (
        <div className="bg-white rounded-2xl md:py-10">
            <section className="mt-8">
                <ArticleCarousel />
            </section>

            <section>
                <div className={`${CONTAINER} mb-8 flex items-center justify-between`}>
                    <div className="space-y-2">
                        <h2 className="text-title-16-teal">แนะนำ</h2>
                        <h1 className="text-2xl md:text-3xl font-bold">ผู้ชมมากที่สุด</h1>
                    </div>
                    <Button variant="outline" size="sm" onClick={scrollToAllArticles}>
                        ดูทั้งหมด
                    </Button>
                </div>
                <FeaturedArticleSection articles={featuredArticles} />
            </section>

            <div id="article-grid">
                <ArticleGridSection articles={allArticles} />
            </div>
        </div>
    );
}
