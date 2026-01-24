import { useEffect, useState } from 'react';
import SymptomGrid from '../components/common/Symptom';
import LoadingScreen from '../components/common/LoadingScreen';
import { fetchSymptomData, type SymptomArticlesData } from '../lib/symptomarticle';
import NeurologicalSymptomSection from '../components/common/NeurologicalSymptomSection';

export default function NeurologicalSymptomPage() {
    const [data, setData] = useState<SymptomArticlesData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const result = await fetchSymptomData();
                setData(result);
            } catch (err) {
                console.error('❌ Failed to load symptom articles:', err);
                setError('ไม่สามารถโหลดข้อมูลได้');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error || !data) return <div className="text-center text-red-500 p-10">{error ?? 'ไม่สามารถโหลดข้อมูลได้'}</div>;

    return (
        <>
            <NeurologicalSymptomSection />
            <SymptomGrid articles={data.articles} />
        </>
    );
}
