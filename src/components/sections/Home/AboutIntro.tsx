import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../../../i18n/LanguageProvider';

export default function AboutNeuroBalance() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const [leftVisible, setLeftVisible] = useState(false);
  const [rightVisible, setRightVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const obs1 = new window.IntersectionObserver(
      ([entry]) => setLeftVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );
    if (leftRef.current) obs1.observe(leftRef.current);

    const obs2 = new window.IntersectionObserver(
      ([entry]) => setRightVisible(entry.isIntersecting),
      { threshold: 0.12 }
    );
    if (rightRef.current) obs2.observe(rightRef.current);

    return () => {
      obs1.disconnect();
      obs2.disconnect();
    };
  }, []);

  return (
    <section className="py-12 px-2 sm:px-6 overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto mb-7 px-2 sm:px-6 py-3">
        <div className="mb-3 flex flex-col items-start gap-2">
          <img
            src="/icons/Tuneing.svg"
            alt="Neuro Balance Icon"
            width={40}
            height={40}
          />
          <span className="about-nb-logo">Neuro Balance</span>
        </div>

        <div className="flex items-center">
          <span className="about-nb-section-title">
            {t.sectionTitle}
          </span>
          <div className="flex-1" />
          <a
            href={t.moreHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full hover:bg-gray-50 transition about-nb-more-btn bg-[#F5F5F5]"
            aria-label={t.more}
          >
            <span className="about-nb-more-btn-text">{t.more}</span>
            <img src="/home/Arrowblack.svg" alt="" className="w-[22px] h-[22px]" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10 items-stretch px-2 sm:px-6">
        <div
          ref={leftRef}
          style={{
            transition:
              'opacity 0.8s cubic-bezier(.39,.58,.57,1), transform 0.8s cubic-bezier(.39,.58,.57,1)',
            opacity: leftVisible ? 1 : 0,
            transform: leftVisible ? 'translateX(0)' : 'translateX(-40px)',
            willChange: 'opacity, transform',
          }}
          className="flex flex-col gap-8 h-full"
        >
          <div className="rounded-[32px] bg-white shadow-[0_12px_60px_0_rgba(64,62,76,0.10)] p-6 sm:p-8 md:p-10 lg:p-12 pb-8 flex-1">
            <div className="about-nb-main-subtitle text-[20px]">
              {t.subtitle}
            </div>
            <img
              src="/home/nb-yellow.svg"
              alt=""
              className="h-auto"
            />
            <div className="about-nb-main-desc">
              {t.description}
            </div>
          </div>

          <div className="bg-white rounded-[28px] shadow-[0_4px_32px_0_rgba(64,62,76,0.08)] px-4 sm:px-5 py-6 md:px-6 md:py-7 flex flex-row items-center gap-4 md:gap-8 max-w-full md:max-w-[700px] mx-auto">
            <img
              src="/home/neuro-balance.svg"
              alt={t.addressImageAlt}
              className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[180px] md:h-[180px] object-cover rounded-[18px] flex-shrink-0 max-w-full"
              style={{ boxShadow: '0 2px 12px 0 rgba(64,62,76,0.08)' }}
            />
            <div className="flex-1 flex flex-col justify-center">
              <div className="about-nb-address-title">{t.companyName}</div>
              <div className="about-nb-address-desc">{t.address}</div>
              <a href="/contact-us" className="about-nb-contact-btn mr-auto" aria-label={t.contactUs}>
                {t.contactUs}
              </a>
            </div>
          </div>
        </div>

        <div
          ref={rightRef}
          style={{
            transition:
              'opacity 0.8s cubic-bezier(.39,.58,.57,1) 0.18s, transform 0.8s cubic-bezier(.39,.58,.57,1) 0.18s',
            opacity: rightVisible ? 1 : 0,
            transform: rightVisible ? 'translateX(0)' : 'translateX(40px)',
            willChange: 'opacity, transform',
          }}
          className="relative h-full"
        >
          <div className="relative w-full h-full rounded-[40px] overflow-hidden shadow-xl">
            <img
              src="/home/person.png"
              alt="Neuro Balance"
              className="absolute inset-0 w-full h-[110%] object-cover -top-10 left-0 object-top"
            />

            <div className="absolute left-0 right-0 bottom-0 w-full max-w-full lg:max-w-[92%] mx-auto pb-4 sm:pb-7 pointer-events-none">
              {/* <div className="relative rounded-[28px] bg-[rgba(162,138,112,0.36)] backdrop-blur-[8px] border border-white/40 shadow-[0_8px_40px_0_rgba(162,138,112,0.18)] px-3 py-6 sm:px-4 sm:py-8 flex flex-col pointer-events-auto">
                <img
                  src="/home/Arrow.svg"
                  alt=""
                  className="absolute top-4 right-4 sm:top-7 sm:right-7 w-7 h-7"
                />
                <div className="about-nb-ex-label">{t.experience.label}</div>
                <div className="about-nb-ex-desc">{t.experience.desc}</div>

                <div className="flex justify-between mt-2">
                  <div className="about-nb-ex-box flex flex-col items-center justify-center">
                    <div className="about-nb-ex-num">45</div>
                    <div className="about-nb-ex-type">{t.experience.public}</div>
                  </div>
                  <div className="about-nb-ex-box flex flex-col items-center justify-center">
                    <div className="about-nb-ex-num">200</div>
                    <div className="about-nb-ex-type">{t.experience.private}</div>
                  </div>
                  <div className="about-nb-ex-box flex flex-col items-center justify-center">
                    <div className="about-nb-ex-num">15,300</div>
                    <div className="about-nb-ex-type">{t.experience.cases}</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const COPY = {
  th: {
    sectionTitle: 'คืออะไร',
    more: 'เพิ่มเติม',
    moreHref: '/about',
    subtitle: 'การสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย',
    description:
      'Neuro Balance คือศูนย์ฟื้นฟูสุขภาพแบบองค์รวมแนวทางใหม่ ที่รวบรวมเทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก ซึ่งได้รับการยอมรับ มีมาตรฐาน และมีผลวิจัยรองรับ โดยมีผู้เชี่ยวชาญด้านสุขภาพคอยดูแลและให้คำปรึกษาอย่างใกล้ชิดในทุกขั้นตอน เรามุ่งเน้นการคืนสมดุลทั้งระบบไฟฟ้าของสมองและของเหลวในร่างกาย เพื่อยกระดับคุณภาพชีวิตของคุณให้ดียิ่งขึ้น',
    companyName: 'บริษัท นูโร บาลานซ์ จำกัด',
    addressImageAlt: 'หน้าศูนย์ Neuro Balance',
    address:
      '65/111 อาคารชำนาญเพ็ญชาติ บิสเนสเซ็นเตอร์ ชั้น 12 ถนนพระราม 9 เขตห้วยขวาง กรุงเทพมหานคร 10310',
    contactUs: 'ติดต่อเรา',
    experience: {
      label: 'ประสบการณ์ของเรา',
      desc: 'เราทำงานร่วมกับหน่วยงานรัฐ และเอกชนทั่วประเทศ รวม 10 ปี',
      public: 'หน่วยงานรัฐ',
      private: 'เอกชน',
      cases: 'เคสรักษา',
    },
  },
  en: {
    sectionTitle: 'What?',
    more: 'More',
    moreHref: '/about',
    subtitle: 'Achieving Holistic Balance Through Innovation and World-Class Technology',
    description:
      'Neuro Balance redefines holistic wellness with cutting-edge technologies sourced from across the globe—recognized, certified, and backed by scientific research. Guided by our expert health professionals, you’ll receive personalized care and meaningful consultation at every step of your journey. We specialize in restoring harmony to both the brain’s electrical networks and the body’s fluid systems, helping you live a better life.',
    companyName: 'Neuro Balance Co., Ltd.',
    addressImageAlt: 'Neuro Balance front desk',
    address:
      '65/111 Chamnan Phenjati Business Center, 12th Floor, Rama IX Rd, Huai Khwang, Bangkok 10310',
    contactUs: 'Contact Us',
    experience: {
      label: 'Our Experience',
      desc: 'We collaborate with public and private organizations nationwide — over 10 years.',
      public: 'public sector',
      private: 'private sector',
      cases: 'cases treated',
    },
  },
} as const;
