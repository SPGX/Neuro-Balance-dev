import { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import Breadcrumb from '../../components/common/Breadcrumb';
import ContentBlock from '../../components/common/ContentBlock';
import IntroBlock from '../../components/common/IntroBlock';
import QuoteBlock from '../../components/common/QuoteBlock';
import OverviewBlock from '../../components/common/OverviewBlock';
import LoadingScreen from '../../components/common/LoadingScreen';
import { fetchBioBalanceData, type BioBalanceData } from '../../lib/biobalanceapi';

export default function BioBalancePage() {
    const [data, setData] = useState<BioBalanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const result = await fetchBioBalanceData();
                setData(result);
            } catch (err) {
                console.error('❌ Failed to load Bio Balance data:', err);
                setError('ไม่สามารถโหลดข้อมูลได้');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error || !data) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <>
            <section className="max-w-[1440px] mx-auto pt-20 mt-6 sm:mt-4">
                <div className="px-6 sm:px-11">
                    <ContentBlock
                        variant="hero"
                        title={data.banner.titleEng}
                        label={data.banner.titleTh}
                        bgImage={data.banner.image}
                        size="lg"
                    />
                </div>
                <div className="px-6 sm:px-11 mt-8">
                    <Breadcrumb path={['คอร์สเทรนนิ่ง', data.banner.titleEng]} />
                </div>

                <QuoteBlock>{parse(data.foreword)}</QuoteBlock>

            </section>
            <IntroBlock
                title={data.intro.title}
                icon={data.intro.icon}
                description={data.intro.description}
            />

            <OverviewBlock
                description={data.overview.description}
                image={data.overview.image}
            />
        </>
    );
}
