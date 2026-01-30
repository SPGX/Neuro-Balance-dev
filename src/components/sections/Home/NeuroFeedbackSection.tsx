import FadeInSection from "../../common/FadeInSection";
import { useLanguage } from "../../../i18n/LanguageProvider";

type Item = { icon: string; title: string; desc: string };

const COPY: Record<'th' | 'en', { eyebrow: string; heading: string; sub: string; items: Item[] }> = {
  th: {
    eyebrow: "ทำไมต้อง",
    heading: "NEUROBALANCE",
    sub: "เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย",
    items: [
      { icon: "/home/feedback1.svg", title: "มั่นใจ ปลอดภัย ไม่ใช้ยา", desc: "กระบวนการของเราปลอดภัย มีประสิทธิภาพสูงและไม่มีการใช้ยา" },
      { icon: "/home/feedback2.svg", title: "ปรับสมดุลร่างกาย", desc: "ด้วยกระบวนการ Bio Balance สามารถปรับสมดุลของร่างกายให้สมดุลและแข็งแรง" },
      { icon: "/home/feedback3.svg", title: "ปรับสมดุลสมอง", desc: "เราทำการปรับสมดุลของสมองด้วยเทคนิคการทำ Neurofeedback เพื่อเสริมประสิทธิภาพสมอง" },
      { icon: "/home/feedback4.svg", title: "เพิ่มศักยภาพของสมอง", desc: "ช่วยเพิ่มศักยภาพด้านการเรียนรู้ ความจำ และการคิดวิเคราะห์ให้ดียิ่งขึ้น" },
      { icon: "/home/feedback5.svg", title: "คุณภาพชีวิตที่ดีขึ้น", desc: "สมอง ร่างกาย และจิตใจที่ดีขึ้น นำไปสู่คุณภาพชีวิตที่ดียิ่งขึ้น" },
      { icon: "/home/feedback6.svg", title: "เห็นผลในระยะยาว", desc: "ผลลัพธ์จากการฝึก Neurofeedback อยู่ได้นาน และไม่มีผลข้างเคียง" },
    ],
  },
  en: {
    eyebrow: "Why",
    heading: "NEUROBALANCE",
    sub: "Bringing holistic balance to life through advanced innovation and technology",
    items: [
      { icon: "/home/feedback1.svg", title: "Safe, Drug-Free, and Trusted", desc: "Our process is safe, highly effective, and completely drug-free" },
      { icon: "/home/feedback2.svg", title: "Body Balance", desc: "Bio Balance helps rebalance your body, allowing you to improve strength and stability" },
      { icon: "/home/feedback3.svg", title: "Brain Balance", desc: "We restore brain balance using Neurofeedback techniques" },
      { icon: "/home/feedback4.svg", title: "Enhance your brain’s potential", desc: "Boost brain performance, capability, and balance for improved learning" },
      { icon: "/home/feedback5.svg", title: "Create a better quality of life.", desc: "Improve brain, body, and mental health—leading to a higher quality of life" },
      { icon: "/home/feedback6.svg", title: "Deliver long-lasting benefits.", desc: "Training promotes optimal brain function with no side effects" },
    ],
  },
};

export default function NeuroFeedbackSection() {
  const { lang } = useLanguage();
  const t = COPY[lang];

  return (
    <section className="py-12 px-10 sm:py-16 sm:px-6 md:px-10">
      <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-12">
        <p className="text-teal-500 font-medium text-sm sm:text-base md:text-lg mb-1">{t.eyebrow}</p>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          {t.heading}
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          {t.sub}
        </p>
      </div>

      <div
        className="
          flex flex-col gap-10 max-w-full
          sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-10
          sm:max-w-5xl lg:max-w-6xl mx-auto
        "
      >
        {t.items.map(({ icon, title, desc }, i) => (
          <FadeInSection key={title} delay={i * 0.08}>
            <div
              className="
                flex items-start gap-4 p-0
                sm:flex-col sm:items-center sm:text-center sm:bg-white sm:rounded-2xl sm:py-8 sm:px-4
                bg-transparent
              "
            >
              <img
                src={icon}
                alt={title}
                className="w-14 h-14 flex-shrink-0 mt-2 sm:w-20 sm:h-20 sm:mb-4 sm:mt-0"
                loading="lazy"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1 text-base sm:text-lg">{title}</h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc}</p>
              </div>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}
