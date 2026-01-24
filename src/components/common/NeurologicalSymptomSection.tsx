// src/components/symptom/NeurologicalSymptomSection.tsx
import { useEffect, useMemo, useState } from 'react';
import parse from 'html-react-parser';
import ContentBlock from '../common/ContentBlock';
import { fetchNeurologicalSymptom } from '../../lib/api';

const ASSET_BASE = (import.meta.env.VITE_API_URL as string)?.replace(/\/api\/?$/, '') || '';
const toAbs = (u?: string | null) => (!u ? undefined : u.startsWith('http') ? u : `${ASSET_BASE}${u}`);

type NeuroBannerImage = {
    url: string;
    formats?: { small?: { url: string }; medium?: { url: string }; large?: { url: string } };
};

type NeuroData = {
    banner?: { title?: string; subTitle?: string; background?: NeuroBannerImage | null } | null;
    intro?: { titleTh?: string; titleEng?: string; description?: string } | null;
};

export default function NeurologicalSymptomSection() {
    const [data, setData] = useState<NeuroData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetchNeurologicalSymptom();
                setData(res?.data ?? null);
            } catch (e: any) {
                setError(e?.message || 'โหลดข้อมูลไม่สำเร็จ');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const bgImage = useMemo(() => {
        const img = data?.banner?.background;
        return toAbs(img?.formats?.large?.url) || toAbs(img?.formats?.medium?.url) || toAbs(img?.url) || '/default-image.svg';
    }, [data]);

    if (loading) return <div className="p-10 text-center">กำลังโหลด...</div>;
    if (error || !data) return <div className="p-10 text-center text-red-500">{error ?? 'ไม่พบข้อมูล'}</div>;

    return (
        <div className='w-full'>
            <section className="px-6 sm:px-11 mt-24 sm:mt-40 mb-14 max-w-[1440px] mx-auto">
                <ContentBlock
                    variant="hero"
                    title={data.banner?.title}
                    subtitle={data.banner?.subTitle}
                    bgImage={bgImage}
                    size="xl"
                    isBanner
                />
            </section>
            <section className="py-12 px-4 max-w-4xl mx-auto text-center">
                {data.intro?.titleTh ? (
                    <h2 className="text-[24px] font-medium text-[#1D2126] mb-1">{data.intro.titleTh}</h2>
                ) : null}
                {data.intro?.titleEng ? (
                    <div className="text-[24px] font-bold text-[#0FC1A1] mb-6">{data.intro.titleEng}</div>
                ) : null}
                <div className="h-px w-full max-w-[1000px] mx-auto mb-8 bg-[linear-gradient(90deg,#90E0AB00,#0FC1A1,#106EE8,#0FC1A1,#90E0AB00)]"></div>
                <div>{data.intro?.description ? parse(data.intro.description) : null}</div>
            </section>
        </div>
    );
}
