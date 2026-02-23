// src/pages/AboutPage.tsx
import React from 'react'
import useSWR from 'swr'
import SplitSection from '../components/common/AboutExperienceSection'
import CoreValueCard from '../components/common/CoreValueCardProps'
import InfoCard from '../components/common/InfoCard'
import { fetchAboutPageData, type AboutData } from '../lib/aboutapi'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
import LoadingScreen from '../components/common/LoadingScreen'
import { useLanguage } from '../i18n/LanguageProvider'
import NeuroFeedbackSection from '../components/sections/Home/NeuroFeedbackSection';

export default function AboutPage() {
  const { lang } = useLanguage()

  const { data: aboutData, error, isLoading } = useSWR<AboutData>(
    ['about-us', lang],
    () => fetchAboutPageData(lang),
    { revalidateOnFocus: false }
  )
  const DEFAULT_PARTNERS = [
    '/partners/partner1.svg',
    '/partners/partner2.svg',
    '/partners/partner3.svg',
    '/partners/partner4.svg',
    '/partners/partner5.svg',
    '/partners/partner6.svg',
  ];

  const partnersList = DEFAULT_PARTNERS;

  if (isLoading) return <LoadingScreen />
  if (error || !aboutData) return <div className="text-center text-red-500 py-10">โหลดข้อมูลไม่สำเร็จ</div>

  return (
    <div className="pt-[64px] space-y-10 sm:space-y-20">
      <section className="max-w-[1440px] px-5 lg:px-9 md:px-9 sm:px-9 mx-auto relative pt-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-[16px] shadow-2xl">
          {aboutData.banners.map((b, i) => (
            <CoreValueCard
              key={`banner-${(b as any)?.id ?? `${b.title}-${i}`}`}
              title={b.title}
              description={b.description}
              image={b.image}
            />
          ))}
        </div>
        {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4 flex-row w-full flex-wrap justify-center">
          <button className="w-[clamp(160px,20vw,212px)] h-[clamp(40px,5vw,46px)] px-[clamp(16px,4vw,32px)] rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-[clamp(14px,1.5vw,20px)] font-semibold shadow-md hover:opacity-90">
            ปรึกษาฟรี
          </button>
          <button className="w-[clamp(120px,12vw,140px)] h-[clamp(40px,5vw,46px)] px-[clamp(16px,4vw,32px)] rounded-full bg-white bg-opacity-30 text-white text-[clamp(14px,1.5vw,20px)] font-semibold shadow-md hover:bg-gray-100 hover:text-gray-800 hover:bg-opacity-70">
            ติดต่อเรา
          </button>
        </div> */}
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:pr-9 space-y-0 sm:space-y-28">
        <SplitSection
          eyebrow={aboutData.about.title}
          title="Neuro Balance"
          description={aboutData.about.description}
          image={aboutData.about.image}
          reverse
        />

        <SplitSection
          eyebrow={aboutData.experience.title}
          title={aboutData.experience.subTitle}
          description={aboutData.experience.description}
          image={aboutData.experience.image}
          stats={aboutData.experience.stats}
          partners={partnersList}
        />
      </section>

      <NeuroFeedbackSection />

      {/* <section className="bg-gray-100 py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          <h5 className="text-title-20-teal mb-2">{aboutData.promoTitleTh}</h5>
          <h2 className="text-title-64-black mb-10">{aboutData.promoTitleEng}</h2>

          <div className="relative">
            <Swiper className="py-4"
              modules={[Pagination]}
              observer
              observeParents
              watchOverflow
              onBeforeInit={(swiper) => {
                swiper.params.pagination = {
                  ...(swiper.params.pagination as any),
                  el: '.nb-card-pagination',
                  clickable: true,
                } as any;
              }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 5, spaceBetween: 24 },
              }}
            >
              {aboutData.promos.map((p, idx) => (
                <SwiperSlide key={`promo-${p.id ?? idx}`} className="!h-auto">
                  <div className="h-full max-w-[420px] w-full mx-auto">
                    <InfoCard
                      variant="highlight"
                      title={p.title}
                      description={p.description}
                      image={p.image || '/images/placeholder.png'}
                    // footer={
                    //   <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl shadow-lg">
                    //     <img src="/icons/ArrowRight.svg" alt="Arrow Right" className="w-4 h-4" />
                    //   </div>
                    // }
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="nb-card-pagination flex justify-center mt-6" />
          </div>
        </div>
      </section > */}
    </div>
  )
}
