import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchSymptomArticleByDocumentId } from '../lib/api';
import ArticleBanner from '../components/common/article/ArticleBanner';
import ArticleBodyWithReference from '../components/common/article/ArticleBodyWithReference';
import MediumContentCardSection from '../components/common/article/MediumContentCardSection';
import BigContentBlock from '../components/common/article/BigContentBlock';
import FeedbackSection from '../components/common/article/FeedbackSection';
import ArticleHeaderMetaAccordion from '../components/common/article/ArticleHeaderMeta';
import LoadingScreen from '../components/common/LoadingScreen';

const BASE = (import.meta.env.VITE_API_URL as string).replace(/\/api\/?$/, '');

export default function SymptomArticlePage() {
  const { documentId } = useParams<{ documentId: string }>();
  const location = useLocation() as any;
  const prefetched = location?.state?.data;
  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(!prefetched);
  const [error, setError] = useState<string | null>(null);
  const title = query.get('title') || '';

  // Show FeedbackSection only for specific article IDs
  const FEEDBACK_ARTICLE_IDS = new Set<string>(['xjxqtsx4y2b0l9oe4fk0lad3']);
  const showFeedback = documentId ? FEEDBACK_ARTICLE_IDS.has(documentId) : false;

  useEffect(() => {
    if (prefetched) {
      setData(mapToVM(prefetched));
      setLoading(false);
      return;
    }
    if (!documentId) {
      setError('ไม่พบรหัสบทความ');
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const res = await fetchSymptomArticleByDocumentId(documentId);
        setData(mapToVM(res?.data ?? res));
      } catch {
        setError('ไม่สามารถโหลดข้อมูลบทความได้');
      } finally {
        setLoading(false);
      }
    })();
  }, [documentId, prefetched]);

  if (loading) return <LoadingScreen />;
  if (error || !data) return <div className="text-center text-red-500 p-10">{error ?? 'ไม่พบข้อมูล'}</div>;

  return (
    <div>
      <ArticleBanner
        title={data.banner.title}
        subTitle={data.banner.subTitle}
        imageUrl={data.banner.image}
        firstBreadcrumb="อาการ"
      />
      {/*content*/}
      <div className="relative z-10 -mt-2 md:-mt-4 lg:-mt-6">
        <div className="bg-white rounded-t-[40px] shadow-[0_-20px_20px_rgba(0,0,0,0.1)] w-full px-6 md:px-16 py-10">
          <ArticleHeaderMetaAccordion
            title={data.header.title || title}
            date={data.header.date}
            viewCount={data.header.viewCount}
            socialLinks={data.header.socialLinks}
            likeCount={data.header.viewCount}
          />
          <ArticleBodyWithReference content={data.body.content} reference={data.body.ref} />
          <MediumContentCardSection cards={data.mediumCards} />
        </div>
        <section className="w-full bg-[#F7F7F7] py-16 px-4 md:px-10">
          <BigContentBlock blocks={data.bigCards} />
        </section>
        {showFeedback && (
          <FeedbackSection content={data.feedback.content} linkToTest="/atec" />
        )}
      </div>
    </div>
  );
}

function mapToVM(attrs: any) {
  const pickImg = (img?: any) =>
    BASE +
    (img?.formats?.large?.url ??
      img?.formats?.medium?.url ??
      img?.formats?.small?.url ??
      img?.url ??
      '');

  const banner = {
    title: attrs.banner?.title ?? '',
    subTitle: attrs.banner?.subTitle ?? '',
    image: pickImg(attrs.banner?.image),
  };

  const header = {
    title: attrs.title ?? '',
    date: attrs.publishedAt ?? '',
    viewCount: attrs.viewCountAndSocial?.viewed ?? 0,
    socialLinks: {
      facebook: attrs.viewCountAndSocial?.facebook ?? null,
      line: attrs.viewCountAndSocial?.line ?? null,
      twitter: attrs.viewCountAndSocial?.twitter ?? null,
      email: attrs.viewCountAndSocial?.email ?? null,
    },
  };

  const body = {
    content: attrs.article?.markDownWithRef?.content ?? attrs.article?.content ?? '',
    ref: attrs.article?.markDownWithRef?.ref ?? '',
  };

  const mediumCards = (attrs.mediumContentCard ?? []).map((card: any) => ({
    id: card.id,
    additionImage: Array.isArray(card.additionImage)
      ? card.additionImage.map((img: any) => ({ id: img.id, url: pickImg(img) }))
      : [],
    MarkDownWithRef: (card.MarkDownWithRef ?? []).map((m: any) => ({
      id: m.id,
      content: m.content ?? '',
      ref: m.ref ?? '',
    })),
    imageContent: card.imageContent
      ? {
          id: card.imageContent.id,
          titleTop: card.imageContent.titleTop ?? '',
          titleBelow: card.imageContent.titleBelow ?? '',
          number: card.imageContent.number ?? '',
          description: card.imageContent.description ?? '',
          image: pickImg(card.imageContent.image),
        }
      : null,
  }));

  const bigCards = (attrs.bigContentCard ?? []).map((card: any) => ({
    id: card.id,
    content: card.content ?? '',
    image: { url: pickImg(card.image) },
  }));

  const feedback = {
    content: attrs.feedback?.content ?? '',
    linkToTest: attrs.feedback?.linkToTest ?? '',
  };

  return { banner, header, body, mediumCards, bigCards, feedback };
}
