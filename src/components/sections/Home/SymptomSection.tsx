import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useLanguage } from "../../../i18n/LanguageProvider";
import { ChevronRight, ArrowRight } from 'lucide-react';

type Symptom = { title: string; desc: string; img: string; };

const COPY: Record<
  "th" | "en",
  {
    eyebrow: string;
    heading: string;
    sub: string;
    tabs: { child: string; adult: string; };
    child: Symptom[];
    adult: Symptom[];
  }
> = {
  th: {
    eyebrow: "อาการที่สังเกต",
    heading: "คุณมีปัญหาแบบนี้\nบ้างหรือไม่?",
    sub: "การเฝ้าสังเกตอาการของผู้มีความเสี่ยงเพื่อเข้ารับการฟื้นฟูและรักษา",
    tabs: { child: "อาการของเด็ก", adult: "อาการของผู้ใหญ่ / สูงอายุ" },
    child: [
      { title: "สมาธิสั้น", desc: "คำอธิบายโดยย่อ", img: "/home/child1.svg" },
      { title: "กระบวนการเรียนรู้", desc: "คำอธิบายโดยย่อ", img: "/home/child2.svg" },
      { title: "ประสาทสัมผัสและการเคลื่อนไหว", desc: "คำอธิบายโดยย่อ", img: "/home/child3.svg" },
      { title: "การสื่อสาร", desc: "คำอธิบายโดยย่อ", img: "/home/child4.svg" },
      { title: "ความจำ", desc: "คำอธิบายโดยย่อ", img: "/home/child5.svg" },
    ],
    adult: [
      { title: "การเคลื่อนไหว", desc: "คำอธิบายโดยย่อ", img: "/home/child5.svg" },
      { title: "ความคิดและการสื่อสาร", desc: "คำอธิบายโดยย่อ", img: "/home/child5.svg" },
      { title: "ความจำ", desc: "คำอธิบายโดยย่อ", img: "/home/child5.svg" },
      { title: "การนอนหลับ", desc: "คำอธิบายโดยย่อ", img: "/home/child5.svg" },
      { title: "ความเครียด", desc: "คำอธิบายโดยย่อ", img: "/home/child5.svg" },
    ],
  },
  en: {
    eyebrow: "Observable Symptoms",
    heading: "Do You Experience\nThese Issues?",
    sub: "Monitoring At-Risk Individuals for Early Rehabilitation and Care",
    tabs: { child: "Children", adult: "Adults / Seniors" },
    child: [
      { title: "Attention Deficit", desc: "description", img: "/home/child1.svg" },
      { title: "Learning Process", desc: "description", img: "/home/child2.svg" },
      { title: "Sensory and Motor Skills", desc: "description", img: "/home/child3.svg" },
      { title: "Communication", desc: "description", img: "/home/child4.svg" },
      { title: "Memory", desc: "description", img: "/home/child5.svg" },
    ],
    adult: [
      { title: "Mobility", desc: "description", img: "/home/child5.svg" },
      { title: "Cognitive Process & Communication", desc: "description", img: "/home/child5.svg" },
      { title: "Memory", desc: "description", img: "/home/child5.svg" },
      { title: "Sleep", desc: "description", img: "/home/child5.svg" },
      { title: "Stress", desc: "description", img: "/home/child5.svg" },
    ],
  },
};

export default function SymptomSection() {
  const { lang } = useLanguage();
  const T = COPY[lang];

  const [group, setGroup] = useState<"child" | "adult">("child");
  const data = group === "child" ? T.child : T.adult;

  return (
    <section className="max-w-7xl mx-auto py-20 px-0">
      <div className="flex flex-col md:flex-row gap-10 w-full">
        {/* LEFT */}
        <div className="w-full md:max-w-lg px-4 flex flex-col justify-center">
          <p className="text-eyebrow mb-2">{T.eyebrow}</p>

          <h2 className="text-heading">
            {T.heading}
          </h2>

          <p className="text-gray-500 mb-6">{T.sub}</p>

          <div className="border border-[#0000001A] mb-7" />

          <div className="flex flex-col gap-2" role="tablist" aria-label="symptom group">
            <button
              className={`text-left px-4 py-3 rounded-lg border transition font-semibold text-[#3E3E44] ${group === "child"
                ? "bg-gray-100 border-none"
                : "bg-white border-none hover:bg-gray-50"
                }`}
              onClick={() => setGroup("child")}
              aria-pressed={group === "child"}
              role="tab"
              type="button"
            >
              <span className="flex justify-between items-center gap-2">
                <span>{T.tabs.child}</span>
                <span><ChevronRight /></span>
              </span>
            </button>
            <button
              className={`text-left px-4 py-3 rounded-lg border transition font-semibold text-[#3E3E44] ${group === "adult"
                ? "bg-gray-100 border-none"
                : "bg-white border-none hover:bg-gray-50"
                }`}
              onClick={() => setGroup("adult")}
              aria-pressed={group === "adult"}
              role="tab"
              type="button"
            >
              <span className="flex justify-between items-center gap-2">
                <span>{T.tabs.adult}</span>
                <span><ChevronRight /></span>
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 min-w-0 pr-0 overflow-x-visible">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 32 },
              1280: { slidesPerView: 2.5, spaceBetween: 40 },
            }}
            // pagination={{ clickable: true }}
            modules={[Pagination]}
            className="pb-10"
          >
            {data.map((item, idx) => (
              <SwiperSlide key={`${item.title}-${idx}`} className="flex justify-center select-none">
                <div className="relative rounded-[32px] overflow-hidden shadow-lg group cursor-pointer w-full max-w-[350px] h-[400px] md:w-[350px] md:h-[700px] bg-gray-200">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 w-full px-6 py-6">
                    {/* แถบพื้นหลังล่างแบบ blur + gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-transparent backdrop-blur-[6px]" />

                    <div className="relative z-10 flex items-end justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="text-white font-extrabold text-[28px] leading-tight truncate">
                          {item.title}
                        </h3>

                        {/* ถ้าต้องการ desc ใต้หัวข้อ (ถ้าไม่อยากมี ให้ลบ div นี้ทิ้งได้เลย) */}
                        <div className="text-white/85 text-sm mt-1 line-clamp-2">
                          {item.desc}
                        </div>
                      </div>

                      {/* ปุ่มวงกลมลูกศร */}
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
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}