import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArticleBanner from '../components/common/article/ArticleBanner';
import ArticleHeaderMetaAccordion from '../components/common/article/ArticleHeaderMeta';
import ArticleBody from '../components/common/article/ArticleBody';
import LoadingScreen from '../components/common/LoadingScreen';
import { fetchArticleByDocumentId } from '../lib/api';
import { getImageUrl } from '../components/utils/image';
import RelatedArticles from '../components/common/article/RelatedArticles';

type RelatedItem = {
    id: number;
    documentId: string;
    title: string;
    publishedAt?: string;
    banner?: { image?: any } | null;
    viewCountAndSocial?: { viewed?: number } | null;
};

function pickArray(v: any): any[] {
    if (!v) return [];
    if (Array.isArray(v)) return v;
    if (Array.isArray(v?.data)) return v.data;
    if (Array.isArray(v?.contents)) return v.contents;
    return [];
}

function extractRelated(data: any): RelatedItem[] {
    const pools = [
        data?.related,
        data?.relatedArticles,
        data?.recommendations,
        data?.relate,
        data?.contents
    ];
    const arr = pools.flatMap(pickArray);
    return arr
        .map((r: any) => {
            const n = r?.article ?? r;
            return {
                id: Number(n?.id ?? 0),
                documentId: String(n?.documentId ?? n?.slug ?? ''),
                title: String(n?.title ?? ''),
                publishedAt: n?.publishedAt,
                banner: { image: n?.banner?.image ?? n?.image ?? null },
                viewCountAndSocial: { viewed: n?.viewCountAndSocial?.viewed ?? 0 }
            } as RelatedItem;
        })
        .filter(x => x.documentId);
}

export default function ArticlePage() {
    const { documentId } = useParams<{ documentId: string }>();
    const [data, setData] = useState<any>(null);
    const [related, setRelated] = useState<RelatedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!documentId) return;
        (async () => {
            try {
                const res = await fetchArticleByDocumentId(documentId);
                const d = res?.data ?? null;
                setData(d);
                setRelated(extractRelated(d));
            } catch {
                setError('ไม่สามารถโหลดบทความได้');
            } finally {
                setLoading(false);
            }
        })();
    }, [documentId]);

    if (loading) return <LoadingScreen />;
    if (error || !data) return <div className="p-10 text-center text-red-500">{error ?? 'ไม่พบข้อมูลบทความ'}</div>;

    const hero = getImageUrl(data.banner?.image, 'large');
    const viewed = data.viewCountAndSocial?.viewed ?? 0;

    return (
        <div>
            <ArticleBanner imageUrl={hero} title={data.title} firstBreadcrumb="บทความ"/>
            <div className="relative z-10 -mt-6 md:-mt-12 lg:-mt-8">
                <div className="bg-white rounded-t-[40px] shadow-[0_-20px_20px_rgba(0,0,0,0.1)] w-full px-6 md:px-16 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 justify-center max-w-[1440px] mx-auto">
                        <div className="lg:col-span-9 col-span-1 mx-auto">
                            <ArticleHeaderMetaAccordion
                            title={data.title}
                            date={data.publishedAt}
                            viewCount={viewed}
                            socialLinks={{
                                facebook: data.viewCountAndSocial?.facebook,
                                line: data.viewCountAndSocial?.line,
                                twitter: data.viewCountAndSocial?.twitter,
                                email: data.viewCountAndSocial?.email,
                            }}
                            likeCount={data.viewCountAndSocial?.liked}
                            />
                            <ArticleBody html={data.content} />
                        </div>
                        <div className="lg:col-span-3 col-span-1">
                            <div className="sticky top-6">
                                <RelatedArticles currentDocumentId={documentId!} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
