import FadeInSection from "../../common/FadeInSection";
import { useLanguage } from "../../../i18n/LanguageProvider";

type Item = { icon: string; title: string; desc: string; };

const COPY: Record<
  "th" | "en",
  { eyebrow: string; heading: string; sub: string; items: Item[]; }
> = {
  th: {
    eyebrow: "ทำไมต้อง",
    heading: "NEUROBALANCE",
    sub: "เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย",
    items: [
      { icon: "/home/feedback1.svg", title: "มั่นใจ ปลอดภัย ไม่ใช้ยา", desc: "กระบวนการของเราปลอดภัยมีประสิทธิภาพสูงและไม่มีการใช้ยา" },
      { icon: "/home/feedback2.svg", title: "ปรับสมดุลร่างกาย", desc: "ด้วยกระบวนการ Bio Balance สามารถปรับสมดุลของร่างกายให้.." },
      { icon: "/home/feedback3.svg", title: "ปรับสมดุลสมอง", desc: "เราทำการปรับสมดุลของสมองด้วยเทคนิคการทำ Neurofeedback" },
      { icon: "/home/feedback4.svg", title: "สามารถเพิ่มศักยภาพของสมอง", desc: "เพิ่มประสิทธิภาพศักยภาพและปรับสมดุลของสมองให้เกิดการเรียนรู้ที่ดีขึ้น" },
      { icon: "/home/feedback5.svg", title: "สร้างคุณภาพชีวิตที่ดีขึ้น", desc: "ทำให้สมอง ร่างกาย สุขภาพ จิตใจดีขึ้น นำไปสู่คุณภาพชีวิตดีขึ้น" },
      { icon: "/home/feedback6.svg", title: "ให้ผลดีในระยะยาว", desc: "การฝึกทำให้สมองเกิดการปรับการทำงาน และไม่มีผลข้างเคียงใดๆ" },
    ],
  },

  en: {
    eyebrow: "Why",
    heading: "NEUROBALANCE",
    sub: "We restore holistic balance with modern innovation and advanced technology.",
    items: [
      { icon: "/home/feedback1.svg", title: "Safe, Trusted, Drug-Free", desc: "Our approach is safe, highly effective, and does not use medication." },
      { icon: "/home/feedback2.svg", title: "Body Balance", desc: "With Bio Balance, we help rebalance your body for better stability and strength.." },
      { icon: "/home/feedback3.svg", title: "Brain Balance", desc: "We rebalance the brain using Neurofeedback techniques." },
      { icon: "/home/feedback4.svg", title: "Enhance Brain Potential", desc: "Improve performance and balance to support better learning and focus." },
      { icon: "/home/feedback5.svg", title: "Better Quality of Life", desc: "Support brain, body, and mental well-being—leading to a better daily life." },
      { icon: "/home/feedback6.svg", title: "Long-Term Benefits", desc: "Training helps the brain adapt and function better, with no side effects." },
    ],
  },
};

export default function NeuroFeedbackSection() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <section className="py-12 px-10 sm:py-16 sm:px-6 md:px-10">
      <div className="sm:max-w-5xl lg:max-w-6xl mx-auto self-center text-center mb-8 sm:mb-12 flex flex-row items-center justify-between flex-wrap">
        <div className="flex flex-col items-start">
          <p className="text-teal-500 font-medium text-sm sm:text-base md:text-lg mb-1">{t.eyebrow}</p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t.heading}
          </h1>
        </div>
        <p className="text-gray-600 text-sm sm:text-base max-w-full sm:max-w-full md:max-w-60 text-left">
          {t.sub}
        </p>
      </div>

      <div
        className="
          grid grid-cols-2 gap-4 max-w-full
          sm:grid-cols-2 sm:gap-10
          lg:grid-cols-3
          sm:max-w-5xl lg:max-w-6xl mx-auto
        "
      >
        {t.items.map(({ icon, title, desc }, i) => {
          const n = String(i + 1).padStart(2, "0");
          const isFirst = i === 0;

          return (
            <FadeInSection key={title} delay={i * 0.08}>
              <div
                className="
                    relative overflow-hidden rounded-2xl
                    bg-white/70 backdrop-blur-[2px]
                    p-6 sm:p-7
                    min-h-full
                  "
                style={{
                  background:
                    "radial-gradient(140% 120% at 65% 35%, rgba(16, 185, 129, 0.18) 0%, rgba(16, 185, 129, 0) 75%)," +
                    "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.70) 100%)",
                }}
              >
                {/* number */}
                <div
                  className={[
                    "text-[22px] font-semibold tracking-wide text-[#11B89B]",
                  ].join(" ")}
                >
                  {n}
                </div>

                {/* icon circle (top-right) */}
                <div
                  className="
                    absolute right-5 top-5
                    w-14 h-14 rounded-full bg-white
                    shadow-[0_10px_22px_rgba(0,0,0,0.10)]
                    grid place-items-center
                  "
                >
                  <img src={icon} alt="" aria-hidden className="w-9 h-9 object-contain" />
                </div>

                {/* content */}
                <div className="mt-8 sm:mt-8 md:mt-5 pr-2">
                  <h4 className="font-bold text-[#1D2126] text-[16px] sm:text-[16px] md:text-[20px] leading-snug line-clamp-3">
                    {title}
                  </h4>
                  <p className="hidden sm:block mt-2 text-[#6B7280] text-[18px] leading-relaxed line-clamp-2">
                    {desc}
                  </p>
                </div>
              </div>
            </FadeInSection>
          );
        })}
      </div>
    </section>
  );
}
