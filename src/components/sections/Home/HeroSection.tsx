import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../i18n/LanguageProvider";

const partnerLogos = [
  "/partners/partner1.svg",
  "/partners/partner2.svg",
  "/partners/partner3.svg",
  "/partners/partner4.svg",
  "/partners/partner5.svg",
  "/partners/partner6.svg",
  "/partners/partner7.svg",
  "/partners/partner8.svg",
] as const;

const COPY = {
  th: {
    h1: (
      <>
        สมดุลยภาพของชีวิตคุณเริ่มต้นที่นี่
      </>
    ),
    h2: "Neuro Balance",
    desc1: "เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย",
    desc2: "ศูนย์ฟื้นฟูสุขภาพแบบองค์รวมแนวทางใหม่ที่รวบรวมเทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก",
    cta1: "ปรึกษาฟรี",
    cta2: "ติดต่อเรา",
    partners: "พาร์ทเนอร์ของเรา",
  },
  en: {
    h1: (
      <>
        Your life’s balance begins here
      </>
    ),
    h2: "Neuro Balance",
    desc1: "Restoring your balance through holistic care, driven by innovation and the latest technology.",
    desc2: "A next-generation holistic wellness center, uniting the most advanced health technologies from around the globe",
    cta1: "Consultation",
    cta2: "Contact Us",
    partners: "Partnership",
  },
} as const;

function StatCard({
  iconSrc,
  title,
  subtitle,
}: {
  iconSrc: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,0.08)] px-4 py-3">
      <div className="h-10 w-10 rounded-xl bg-white/70 grid place-items-center shadow-sm">
        <img src={iconSrc} alt="" className="object-contain" aria-hidden />
      </div>
      <div className="leading-tight">
        <div className="text-[15px] font-extrabold text-slate-800">{title}</div>
        <div className="text-[12px] font-medium text-slate-600">{subtitle}</div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  const onClickCta1 = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("appointment");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.location.href = "/#appointment";
  }, []);

  // split "Neuro Balance" -> 2 lines like the design
  const [titleTop, titleBottom] = useMemo(() => {
    const parts = String(t.h2).split(" ");
    return [parts[0] || t.h2, parts.slice(1).join(" ") || ""];
  }, [t.h2]);

  // ✅ ปรับ path ให้เป็นของคุณ
  const ASSET = {
    doctor: "/home/doctor.png", // รูปคน
    brain: "/home/brain.svg", // รูป brain bubble
    pill: "/home/hero-pill.png", // ไอคอนยา/แคปซูล
    iconBrain: "/home/icon-brain.svg",
    iconAward: "/home/icon-award.svg",
    medic: "/home/medic.svg", // รูปคนถือกระเป๋า
    bag: "/home/bag2.png", // รูปกระเป๋า
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-20 h-1/2"
      />

      <div className="absolute inset-0 top-0 w-full h-full pointer-events-none select-none -z-10">
        <img
          src="/home/wave-2.svg"
          alt=""
          className="w-full h-full object-cover"
          aria-hidden
          draggable={false}
        />
        <div className="bg-gradient-to-t from-white via-white/90 to-white/60 bg-[#D7E7F6] h-2/3 w-full" />
      </div>

      <div className="lg:hidden absolute right-4 top-36 z-20 flex flex-col gap-3">
        <StatCard iconSrc={ASSET.iconBrain} title="5,654 Cases" subtitle={lang === "th" ? "เกี่ยวกับสมอง" : "Brain-related"} />
        <StatCard iconSrc={ASSET.iconAward} title="10 Years" subtitle={lang === "th" ? "ฟื้นฟูสุขภาพแบบองค์รวม" : "Holistic wellness"} />
        <img
          src={ASSET.medic}
          alt=""
          className="ml-auto mt-1 h-10 w-10 object-contain drop-shadow"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-12 lg:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6 text-left mt-10 sm:mt-10 md:mt-0">
            <div className="text-slate-700/80 font-semibold text-[14px] sm:text-[14px] md:text-[16px]">
              {t.h1}
            </div>

            <div
              className="mt-14 sm:mt-14 md:mt-4 font-bold leading-[0.95] tracking-tight lg:text-[92px] text-[64px] sm:text-[64px] md:text-[78px]"
              style={{
                color: "transparent",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                backgroundImage:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.92) 55%, rgba(255,255,255,0.55) 100%)",
                textShadow: "0 18px 40px rgba(0,140,255,0.12)",
              }}
            >
              {titleTop}
              <br />
              <div className="mt-6 sm:mt-10 md:mt-0">
                {titleBottom || "Balance"}
              </div>
            </div>

            <div className="mt-6 max-w-xl text-slate-700/70 text-[15px] sm:text-[16px] leading-relaxed">
              {t.desc1}
              <br />
              {t.desc2}
            </div>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                to="/#appointment"
                aria-label={t.cta1}
                onClick={onClickCta1}
                className="inline-flex items-center justify-center font-semibold text-white text-base sm:text-lg rounded-xl shadow-md"
                style={{
                  width: 130,
                  height: 52,
                  padding: "10px 24px",
                  background: "linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#009EFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)";
                }}
              >
                {t.cta1}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative hidden lg:block">
            <div className="relative h-[520px] w-full">
              <div className="absolute -left-4 top-20 w-[320px] h-[390px] overflow-hidden object-contain">
                <img src={ASSET.doctor} alt="" className="w-full h-full object-contain" aria-hidden />
              </div>

              <div className="absolute right-0 bottom-10 w-[240px] h-[400px] overflow-hidden object-contain">
                <img src={ASSET.brain} alt="" className="w-full h-full object-cover" aria-hidden />
              </div>

              <div className="absolute -left-28 top-6 flex flex-col gap-3">
                <StatCard iconSrc={ASSET.iconBrain} title="5,654 Cases" subtitle={lang === "th" ? "เกี่ยวกับสมอง" : "Brain-related"} />
                <StatCard iconSrc={ASSET.iconAward} title="10 Years" subtitle={lang === "th" ? "ฟื้นฟูสุขภาพแบบองค์รวม" : "Holistic wellness"} />
              </div>

              <img
                src={ASSET.medic}
                alt=""
                className="absolute left-[220px] top-[110px] h-12 w-12 object-contain drop-shadow"
                aria-hidden
              />

              <div className="absolute left-2 bottom-11 w-[86px] h-[86px] grid place-items-center">
                <img
                  src={"/home/bag.png"}
                  alt=""
                  className="h-20 w-20 object-contain drop-shadow"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-14 flex flex-col items-center w-full">
          <div className="text-slate-700/70 font-semibold mb-4">{t.partners}</div>
          <div className="relative w-[78%] max-w-3xl mx-auto overflow-hidden py-1 sm:py-2">
            <div className="pointer-events-none absolute left-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-r from-white/30 via-white/70 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-l from-white/30 via-white/70 to-transparent z-10" />
            <div className="flex items-center gap-5 sm:gap-7 whitespace-nowrap animate-partner-marquee bg-transparent">
              {[...partnerLogos, ...partnerLogos].map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt={`partner-${idx + 1}`}
                  className="shrink-0 h-[44px] sm:h-[48px] md:h-[52px] object-contain grayscale hover:grayscale-0 hover:opacity-100"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}