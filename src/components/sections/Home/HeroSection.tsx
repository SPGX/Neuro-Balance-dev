import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageProvider'

const partnerLogos = [
  '/partners/partner1.svg',
  '/partners/partner2.svg',
  '/partners/partner3.svg',
  '/partners/partner4.svg',
  '/partners/partner5.svg',
  '/partners/partner6.svg',
  '/partners/partner7.svg',
  '/partners/partner8.svg',
] as const
const COPY = {
  th: {
    h1: <>สมดุลยภาพของชีวิตคุณ<br />เริ่มต้นที่นี่</>,
    h2: 'Neuro Balance',
    desc1: 'เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย',
    desc2: 'ศูนย์ฟื้นฟูสุขภาพแบบองค์รวมแนวทางใหม่ที่รวบรวมเทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก',
    cta1: 'ปรึกษาฟรี',
    cta2: 'ติดต่อเรา',
    partners: 'พาร์ทเนอร์ของเรา',
  },
  en: {
    h1: <>Your life’s balance<br />begins here</>,
    h2: 'Neuro Balance',
    desc1: 'Restoring your balance through holistic care, driven by innovation and the latest technology.',
    desc2: 'A next-generation holistic wellness center, uniting the most advanced health technologies from around the globe',
    cta1: 'Consultation',
    cta2: 'Contact Us',
    partners: 'Partnership',
  },
} as const

export default function HeroSection() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  const onClickCta1 = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById('appointment')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.location.href = '/#appointment'
    }
  }, [])

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
      <img
        src="/home/wave-1.svg"
        alt=""
        className="absolute inset-0 w-full object-cover pointer-events-none select-none -z-10"
        style={{ height: '80%', objectPosition: 'bottom' }}
        aria-hidden
        draggable={false}
      />

      <div className="relative z-10 w-full flex flex-col items-center pt-20 sm:pt-24 md:pt-40 pb-8 sm:pb-10 md:pb-12 px-4 sm:px-6 md:px-4 max-w-md sm:max-w-3xl md:max-w-6xl mx-auto">
        <h1 className="text-hero-th-gradient text-center animate-fade-in-up">{t.h1}</h1>
        <h2 className="text-hero-en-gradient mt-3 sm:mt-4 text-center animate-fade-in-up-delayed">{t.h2}</h2>
        <div className="text-hero-desc-gradient mt-6 sm:mt-7 md:mt-8 text-center animate-fade-in-up-delayed">
          {t.desc1}
          <br />
          {t.desc2}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-fade-in-up-delayed">
          <Link
            to="/#appointment"
            aria-label={t.cta1}
            onClick={onClickCta1}
            className="flex items-center justify-center font-semibold text-white text-base sm:text-lg rounded-full shadow-md gap-2"
            style={{
              width: 180,
              height: 48,
              padding: '8px 40px',
              borderRadius: '100px',
              background: 'linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#009EFF'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                'linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)'
            }}
          >
            {t.cta1}
          </Link>

          <Link
            to="/contact-us"
            aria-label={t.cta2}
            className="flex items-center justify-center font-semibold text-[#207DFA] text-base sm:text-lg rounded-full shadow-sm border border-gray-300 transition-colors gap-2 bg-white"
            style={{
              width: 180,
              height: 48,
              padding: '8px 40px',
              borderRadius: '100px',
              background: '#fff',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#EDF5FF'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = '#fff'
            }}
          >
            {t.cta2}
          </Link>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-8 flex flex-col items-center w-full animate-fade-in-up-delayed">
          <div className="text-partner-title-gradient mb-4 sm:mb-5 md:mb-6">{t.partners}</div>

          <div className="relative w-[70%] max-w-xl mx-auto overflow-hidden py-1 sm:py-2">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-r from-white via-white/70 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 sm:w-10 bg-gradient-to-l from-white via-white/70 to-transparent z-10" />
            <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap animate-partner-marquee">
              {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt={`partner-${idx + 1}`}
                  className="shrink-0 h-[44px] sm:h-[48px] md:h-[50px] object-contain grayscale opacity-70"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
