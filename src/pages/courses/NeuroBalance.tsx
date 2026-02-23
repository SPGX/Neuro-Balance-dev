import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Breadcrumb from '../../components/common/Breadcrumb';
import ContentBlock from '../../components/common/ContentBlock';
import IntroBlock from '../../components/common/IntroBlock';
import QuoteBlock from '../../components/common/QuoteBlock';
import OverviewBlock from '../../components/common/OverviewBlock';
import { fetchNeuroBalanceCourse } from '../../lib/api';
import TextImageSection from '../../components/common/TextImageSection';
import NeurofeedbackActivitiesSection from '../../components/common/NeurofeedbackActivitiesSection';
import BrainMappingSection from '../../components/common/BrainMappingSection';

import LoadingScreen from '../../components/common/LoadingScreen';
import BannerBlock from '../../components/common/BannerBlock';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export default function NeuroBalancePage() {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetchNeuroBalanceCourse();
                const attrs = res.data;

                const bannerImageUrl =
                    attrs?.banner?.background?.formats?.large?.url ??
                    attrs?.banner?.background?.url;

                const introImageUrl = attrs?.intro?.image?.url ??
                    attrs?.intro?.image?.url;

                const overviewImageUrl = attrs?.intro?.secondImage?.url ??
                    attrs?.intro?.secondImage?.url;

                const intro = {
                    title: attrs?.intro?.title ?? '',
                    icon: introImageUrl ? `${BASE_URL}${introImageUrl}` : '',
                    description: attrs?.intro?.description ?? '',
                };

                const overview = {
                    description: attrs?.intro?.secondDescription ?? '',
                    image: overviewImageUrl ? `${BASE_URL}${overviewImageUrl}` : '',
                };

                const process = {
                    titleTh: attrs?.process?.titleTh ?? '',
                    titleEng: attrs?.process?.titleEng ?? '',
                    description: attrs?.process?.description ?? '',
                    image: attrs?.process?.image?.url
                        ? `${BASE_URL}${attrs.process.image.url}`
                        : '',

                    brainMapping: {
                        titleTh: attrs?.process?.brainMapping?.titleTh ?? '',
                        titleEng: attrs?.process?.brainMapping?.titleEng ?? '',
                        description: attrs?.process?.brainMapping?.description ?? '',
                        image: attrs?.process?.brainMapping?.image?.url
                            ? `${BASE_URL}${attrs.process.brainMapping.image.url}`
                            : '',
                    },
                    neurofeedback: {
                        titleTh: attrs?.process?.neurofeedback?.titleTh ?? '',
                        titleEng: attrs?.process?.neurofeedback?.titleEng ?? '',
                        description: attrs?.process?.neurofeedback?.description ?? '',
                        activities: (attrs?.process?.neurofeedback?.activities ?? []).map((a: any) => ({
                            id: a.id,
                            title: a.title,
                            subTitle: a.subTitle,
                            description: a.description,
                            image: a?.image?.url ? `${BASE_URL}${a.image.url}` : '',
                        })),
                    },
                };

                setData({
                    bannerImage: bannerImageUrl ? `${BASE_URL}${bannerImageUrl}` : '',
                    foreword: attrs?.foreword ?? '',
                    intro,
                    description: attrs?.description ?? '',
                    overview,
                    process
                });
            } catch (err) {
                console.error('❌ Failed to load Neuro Balance data:', err);
                setError('ไม่สามารถโหลดข้อมูลได้');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <>
            <section className="max-w-[1440px] mx-auto py-20 mt-6 sm:mt-4">
                <div className="px-6">
                    {/* <ContentBlock
                        variant="hero"
                        title="Neuro Balance"
                        bgImage={data?.bannerImage}
                        label="คอร์สเทรนนิ่ง"
                        size="lg"
                    /> */}
                    <BannerBlock
                        img="/images/course-bg.svg"
                        title="คอร์สเทรนนิ่ง"
                        des="Neuro"
                        rightTitle="สมองที่มีความสมดุล"
                        rightDesc="นั้นก่อให้เกิดประโยชน์มากมาย โดยรวมคือการทำให้มีสุขภาพที่ดี การดูแลสุขภาพรักษากายและใจให้พร้อมสำหรับการดำเนินชีวิตใหม่ๆในแต่ละวัน ซึ่งไม่ได้ถือว่าเป็นเรื่องยาก หากแต่รู้จักการจัดระบบสมองให้มีความสมดุล"
                    />
                </div>
                <div className="absolute bottom-[-900px] left-[-100px] w-[400px] h-[400px] bg-[radial-gradient(circle_at_center,_#0FC1A11A,_transparent)] opacity-100 blur-3xl hidden md:block"></div>
                <div className="px-6 sm:px-11 mt-8">
                    <Breadcrumb path={['คอร์สเทรนนิ่ง', 'Neuro Balance']} />
                </div>

                <div className="px-11">
                    <QuoteBlock>{parse(data.foreword)}</QuoteBlock>
                </div>
            </section>

            <IntroBlock
                title={data?.intro?.title}
                icon={data?.intro?.icon}
                description={data?.intro?.description}
            />

            <div className="pb-20 space-y-16">
                <OverviewBlock
                    description={data?.overview?.description}
                    image={data?.overview?.image}
                />
            </div>

            {/* กระบวนการของ Neurofeedback */}
            <TextImageSection
                sectionTitleTh={data?.process?.titleTh ?? ''}
                sectionTitleEng={data?.process?.titleEng ?? ''}
                contentHtml={data?.process?.description ?? ''}
                imageUrl={data?.process?.image} />
            <BrainMappingSection
                sectionTitleTh={data?.process?.brainMapping?.titleTh ?? ''}
                sectionTitleEng={data?.process?.brainMapping?.titleEng ?? ''}
                contentHtml={data?.process?.brainMapping?.description ?? ''}
                imageUrl={data?.process?.brainMapping?.image ?? ''}
            />
            <section className="mx-auto">

                <NeurofeedbackActivitiesSection
                    titleTh={data?.process?.neurofeedback?.titleTh ?? ''}
                    titleEng={data?.process?.neurofeedback?.titleEng ?? ''}
                    activities={data?.process?.neurofeedback?.activities ?? []}
                    description={data?.process?.neurofeedback?.description ?? ''}
                />
            </section>
        </>
    );
}