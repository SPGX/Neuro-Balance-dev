import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageProvider'

type Card = { icon: string; title: string; desc: string; href?: string }

const COPY = {
  th: {
    eyebrow: 'กระบวนการฟื้นฟู',
    heading: 'ประเภทของสมดุลยภาพ',
    detail: 'รายละเอียด',
    cards: [
      {
        icon: 'icons/type-brain.svg',
        title: 'Neuro Balance',
        desc:
          'กระบวนการที่ช่วยปรับปรุงความสมดุลให้แก่สมอง และเพิ่มประสิทธิภาพการทำงานของสมองให้ดียิ่งขึ้นสร้างสารสื่อประสาทเพื่อรักษาสมดุลในสมองที่ได้รับการกระตุ้นพัฒนาเรื่องความจำ',
        href: '/courses/neuro-balance',
      },
      {
        icon: 'icons/type-bio.svg',
        title: 'Bio Balance',
        desc:
          'Bio balance เป็นการเสริมสร้างและฟื้นฟูแนวใหม่ โดยอาศัยคลื่นพลังงานแม่เหล็กที่มีความถี่ต่ำ ซึ่งจะส่งผลต่อร่างกายให้เกิดการกระตุ้นการหมุนเวียนและเพิ่มศักยภาพการไหลเวียนของโลหิตได้ดีขึ้น...',
        href: '/courses/bio-balance',
      },
    ] as Card[],
  },
  en: {
    eyebrow: 'The Recovery Process',
    heading: 'Dimensions of Balance',
    detail: 'Details',
    cards: [
      {
        icon: 'icons/type-brain.svg',
        title: 'Neuro Balance',
        desc:
          'An advanced process that restores brain balance, boosts cognitive efficiency, and stimulates neurotransmitter production—promoting memory enhancement and sustaining the brain’s natural harmony.',
        href: '/courses/neuro-balance',
      },
      {
        icon: 'icons/type-bio.svg',
        title: 'Bio Balance',
        desc:
          'Bio Balance introduces a revolutionary method of enhancement and restoration, utilizing low-frequency magnetic energy waves to stimulate the body, promote circulation, and maximize blood flow efficiency',
        href: '/courses/bio-balance',
      },
    ] as Card[],
  },
} as const

export default function BalanceTypesSection() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  const options = { triggerOnce: true, threshold: 0.2 }
  const { ref: card1Ref, inView: card1In } = useInView(options)
  const { ref: card2Ref, inView: card2In } = useInView(options)

  return (
    <section className="relative pt-16 pb-[150px] md:pb-[200px] lg:pb-[300px] px-4 md:px-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-1/2 h-[200px] md:h-[300px] lg:h-[400px] bg-gradient-to-t from-[#dff7f9] to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-[200px] md:h-[300px] lg:h-[400px] bg-gradient-to-t from-[#dff7f9] to-transparent" />
      </div>

      <div className="max-w-7xl mb-20 mx-auto text-center relative z-10">
        <div className="flex flex-col items-center gap-1 mb-2">
          <img src="/home/HeartPulse.svg" alt="" className="w-12 h-12 mb-1" />
          <span className="text-title-24-teal font-semibold">{t.eyebrow}</span>
        </div>
        <h2 className="text-title-48 md:text-[44px] font-extrabold text-[#2B3240] mt-2">
          {t.heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto relative z-10">
        {t.cards.map((c, idx) => (
          <div
            key={c.title}
            ref={idx === 0 ? card1Ref : card2Ref}
            className={`relative bg-white rounded-[40px] shadow-[0px_8px_40px_0px_rgba(24,183,255,0.13)]
          p-8 sm:p-10 md:p-12 flex flex-col
          ${idx === 0
                ? card1In
                  ? 'animate-grow-in'
                  : 'opacity-0 translate-y-6'
                : card2In
                  ? 'animate-grow-in delay-200'
                  : 'opacity-0 translate-y-6'
              }`}
          >
            <img
              src={c.icon}
              alt={c.title}
              className="absolute left-10 -top-16 w-36 h-36 object-contain pointer-events-none select-none"
              aria-hidden="true"
              draggable={false}
              style={{ zIndex: 1 }}
            />
            <div className="pt-16 pl-1">
              <h3 className="text-title-32-black mb-4">{c.title}</h3>
              <p className="text-body-20-medium mb-8 whitespace-pre-line">{c.desc}</p>

              <Link
                to={c.href || '#'}
                className="text-btn-main bg-[#18AFFF] hover:bg-[#009EFF] transition text-white px-8 py-3 rounded-full shadow-lg active:scale-95 inline-flex justify-center"
                style={{ boxShadow: '0px 2px 16px 0px #6BC7F6', minWidth: 160, letterSpacing: 0 }}
                aria-label={`${t.detail}: ${c.title}`}
              >
                {t.detail}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
