import React, { useEffect, useState } from 'react';
import SplitSection, { Stat } from '../components/common/AboutExperienceSection';
import CoreValueCard from '../components/common/CoreValueCardProps';
import InfoCard from '../components/common/InfoCard';
import { fetchAboutData } from '../lib/api';
function getImageUrl(imageSource: any, size: 'large' | 'medium' = 'large'): string {
  const baseApiUrl = import.meta.env.VITE_API_URL;
  const baseUrl = baseApiUrl.replace('/api', ''); // ✨ remove /api
  const img = Array.isArray(imageSource) ? imageSource[0] : imageSource;

  const url = img?.formats?.[size]?.url ?? img?.url ?? '';
  return url ? baseUrl + url : '/images/placeholder.png';
}



interface AboutData {
  banners: {
    title: string;
    description: string;
    image: string;
  }[];
  about: {
    title: string;
    description: string;
    image: string;
  };
  experience: {
    title: string;
    subTitle: string;
    description: string;
    image: string;
    stats: Stat[];
    partners: string[];
  };
  promos: {
    title: string;
    description: string;
  }[];
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const json = await fetchAboutData();
        const data = json.data;

        const rawBanners = Array.isArray(data.banner) ? data.banner : [data.banner];

        const banners = rawBanners.map((b: any) => ({
          title: b.title,
          description: b.description,
          image: getImageUrl(b.image),
        }));

        const about = {
          title: data.about.title,
          description: data.about.description,
          image: getImageUrl(data.about.image),
        };

        const experience = {
          title: data.experience.title,
          subTitle: data.experience.subTitle,
          description: data.experience.description,
          image: getImageUrl(data.experience.image),
          stats: data.experience.cases.map((c: any) => ({
            value: c.number.toLocaleString(),
            label: c.case,
          })),
          partners: data.experience.ourPartner.map((p: any) => getImageUrl(p)),
        };

        const promos = data.appPromo.contents.map((p: any) => ({
          title: p.title,
          description: p.description,
        }));

        setAboutData({ banners, about, experience, promos });
      } catch (err) {
        console.error('❌ Failed to load about data:', err);
        setError('โหลดข้อมูลไม่สำเร็จ');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="text-center py-10">กำลังโหลด...</div>;
  if (error || !aboutData)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="pt-10 space-y-28">
      <section className="w-full max-w-[1440px] mx-auto relative pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 overflow-hidden rounded-[16px] shadow-xl">
          {aboutData.banners.map((b) => (
            <CoreValueCard
              key={b.title}
              title={b.title}
              description={b.description}
              image={b.image}
            />
          ))}
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          <button className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md hover:opacity-90">
            ปรึกษาฟรี
          </button>
          <button className="px-8 py-2 rounded-full bg-white text-gray-800 font-semibold shadow-md hover:bg-gray-100">
            ติดต่อเรา
          </button>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-0 space-y-28">
        <SplitSection
          eyebrow={aboutData.about.title}
          title="Neuro Balance"
          description={<p>{aboutData.about.description}</p>}
          image={aboutData.about.image}
          reverse
        />

        <SplitSection
          eyebrow={aboutData.experience.title}
          title={aboutData.experience.subTitle}
          description={<p>{aboutData.experience.description}</p>}
          image={aboutData.experience.image}
          stats={aboutData.experience.stats}
          partners={aboutData.experience.partners}
        />
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <h5 className="text-teal-600 font-semibold mb-2">ทำไมต้อง</h5>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-10">
            NEUROBALANCE
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aboutData.promos.map(({ title, description }) => (
              <InfoCard
                key={title}
                variant="highlight"
                title={title}
                description={description}
                image="/images/placeholder.png"
                footer={
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl">
                    →
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
