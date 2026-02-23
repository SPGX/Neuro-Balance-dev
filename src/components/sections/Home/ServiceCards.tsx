import { useEffect, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../../i18n/LanguageProvider';
import { ArrowRight } from 'lucide-react';

type Service = { title: string; desc: string; link: string; image: string; };

const TH = {
  eyebrow: 'My Service',
  heading: 'บริการของเรา',
  desc: 'เรามีบริการสำหรับลูกค้าทุกช่วงอายุเพื่อช่วยส่งเสริมสุขภาพสมองและสุขภาพร่างกายตามมาตรฐานที่ได้รับการยอมรับ พร้อมผู้เชี่ยวชาญคอยให้คำแนะนำตลอดการเข้ารับบริการ',
  linkLabel: 'รายละเอียด',
  list: [
    { title: 'ให้คำปรึกษา', desc: 'ปรึกษาฟรีทุกอาการทางสมอง', link: '/contact-us', image: '/home/message.svg' },
    { title: 'เทรนนิ่ง', desc: 'กิจกรรมปรับสมดุลสมอง', link: '/courses', image: '/home/aura.svg' },
  ],
};

const EN = {
  eyebrow: 'My Service',
  heading: 'My Service',
  desc: 'Offering services for every age group, we enhance brain and body health with globally recognized standards and research-backed methods. Our specialists provide expert guidance and tailored care throughout your wellness experience.',
  linkLabel: 'Detail',
  list: [
    { title: 'Consultation', desc: 'Get a Free Expert Consultation', link: '/contact-us', image: '/home/message.svg' },
    { title: 'Training', desc: 'Unlock Your Potential with Brain-Balancing Activities', link: '/courses', image: '/home/aura.svg' },
  ],
};

const ASSET = {
  message: '/home/message.svg',
  aura: '/home/aura.svg',
  bg: '/home/bg-aura.svg',
};

function useInViewToggle<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    const obs = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setVisible(entry.isIntersecting);
      });
    }, options);
    obs.observe(el);
    return () => {
      cancelAnimationFrame(rafId);
      obs.disconnect();
    };
  }, [options.threshold, options.rootMargin]);
  return { ref, visible };
}

export default function OurServices() {
  const { lang } = useLanguage();
  const t = lang === 'en' ? EN : TH;

  const { ref: leftRef, visible: leftVisible } = useInViewToggle<HTMLDivElement>();

  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardVisible, setCardVisible] = useState<boolean[]>(
    Array.from({ length: t.list.length }).map(() => false)
  );

  const { ref: mobileWrapRef, visible: mobileWrapVisible } = useInViewToggle<HTMLDivElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -10% 0px',
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [mobileCardVisible, setMobileCardVisible] = useState<boolean[]>(
    Array.from({ length: t.list.length }).map(() => false)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setCardVisible(Array.from({ length: t.list.length }).map(() => true));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.idx);
          setCardVisible((prev) => {
            const next = [...prev];
            next[idx] = entry.isIntersecting;
            return next;
          });
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -12% 0px' }
    );
    cardRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [t.list.length]);

  useEffect(() => {
    setCardVisible((prev) => Array.from({ length: t.list.length }, (_, i) => prev[i] ?? false));
    setMobileCardVisible((prev) => Array.from({ length: t.list.length }, (_, i) => prev[i] ?? false));
    cardRefs.current.length = t.list.length;
  }, [t.list.length]);

  useEffect(() => {
    if (!mobileWrapVisible) {
      setMobileCardVisible((prev) => prev.map(() => false));
      return;
    }
    setMobileCardVisible((prev) => prev.map((_, i) => i === activeSlide));
  }, [mobileWrapVisible, activeSlide]);

  const baseHidden = 'opacity-0 translate-y-4 will-change-[opacity,transform]';
  const baseShow = 'opacity-100 translate-y-0';
  const baseTrans = 'transition duration-700 ease-[cubic-bezier(.39,.58,.57,1)]';

  return (
    <section className="py-12 sm:py-16 px-2 sm:px-4 bg-transparent">
      <div
        className="max-w-7xl mx-auto rounded-[40px] bg-white/90 px-4 sm:px-10 py-12 flex flex-col lg:flex-row gap-8 lg:gap-4 backdrop-blur-[4px]"
        style={{ boxShadow: '0px 0px 50px 0px #CBE4E080' }}
      >
        <div
          ref={leftRef}
          className={[
            'flex-1 flex flex-col gap-6 justify-center max-w-lg lg:pr-10',
            baseTrans,
            leftVisible ? baseShow : baseHidden,
          ].join(' ')}
        >
          <div className="flex flex-col items-start gap-2">
            <img src="/icons/Hearts.svg" alt="" width={40} height={40} className="block" aria-hidden="true" />
            <span className="text-eyebrow-en">{t.eyebrow}</span>
          </div>
          <h2 className="text-heading-th">{t.heading}</h2>
          <p className="text-desc-th mt-2">{t.desc}</p>
        </div>

        <div className="flex-[2] w-full">
          <div className="hidden md:grid grid-cols-2 gap-6">
            {t.list.map((s, i) => (
              <div
                key={s.link}
                ref={(el) => { cardRefs.current[i] = el; }}
                data-idx={i}
                className={[
                  "rounded-[32px] overflow-hidden bg-white relative",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.08)]",
                  "border border-white/60",
                  baseTrans,
                  cardVisible[i] ? baseShow : baseHidden,
                ].join(" ")}
                style={{ transitionDelay: `${cardVisible[i] ? i * 100 : 0}ms` }}
              >
                <img
                  src={ASSET.bg}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none select-none"
                  loading="lazy"
                />

                <Link
                  to={s.link}
                  aria-label={`${t.linkLabel}: ${s.title}`}
                  className="group block h-full relative z-10"
                >
                  <div className="relative h-[290px]">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/20" />
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[74%] h-[54%] object-contain drop-shadow-[0_18px_35px_rgba(0,0,0,0.12)]"
                      loading="lazy"
                    />
                  </div>

                  <div className="px-7 py-6">
                    <div className="flex items-center justify-between gap-5 relative">
                      <div className="min-w-0">
                        <div className="text-white font-medium text-[28px] leading-tight truncate">
                          {s.title}
                        </div>
                        <div className="text-white/90 text-sm mt-1 line-clamp-2">
                          {s.desc}
                        </div>
                      </div>

                      <div className="shrink-0 absolute right-0 bottom-12 ">
                        <div
                          className={[
                            "w-14 h-14 rounded-full bg-white/95 grid place-items-center",
                            "shadow-[0_12px_24px_rgba(0,0,0,0.16)]",
                            "transition-transform duration-300",
                            "group-hover:scale-[1.05]",
                          ].join(" ")}
                        >
                          <ArrowRight className="w-6 h-6 text-[#2CC9A6] transition-transform duration-300 group-hover:translate-x-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="absolute inset-0 z-[5] pointer-events-none bg-black/0" />
              </div>
            ))}
          </div>

          <div className="block md:hidden" ref={mobileWrapRef}>
            <Swiper
              spaceBetween={18}
              slidesPerView={1}
              pagination={{ clickable: true }}
              modules={[Pagination]}
              style={{ paddingBottom: 32 }}
              onSlideChange={(sw) => setActiveSlide(sw.activeIndex)}
              onAfterInit={(sw) => setActiveSlide(sw.activeIndex)}
            >
              {t.list.map((s, i) => (
                <SwiperSlide key={s.link}>
                  <div
                    className={[
                      'bg-gradient-to-b from-[#ECFBFA] via-white to-white rounded-[32px] shadow-lg border border-[#D6FAF5]/100 backdrop-blur-[2px] overflow-hidden',
                      baseTrans,
                      mobileCardVisible[i] ? baseShow : baseHidden,
                    ].join(' ')}
                    style={{ transitionDelay: `${mobileCardVisible[i] ? 80 : 0}ms` }}
                  >
                    <div className="px-6 pt-6 text-center">
                      <h3 className="text-service-title mb-1">{s.title}</h3>
                      <div className="text-service-desc mb-3">{s.desc}</div>
                      <Link
                        to={s.link}
                        className="inline-flex items-center text-link-th font-bold hover:underline text-lg group transition"
                        aria-label={`${t.linkLabel}: ${s.title}`}
                      >
                        {t.linkLabel}
                        <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-[200px] object-cover object-center"
                      loading="lazy"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
