import { useRef, useState } from "react";

const faqs = [
    {
        q: "Neuro Balance คืออะไร",
        a: "Neuro Balance คือโปรแกรมประเมินและฝึกการทำงานของระบบประสาท เพื่อช่วยพัฒนาสมดุลร่างกาย การเคลื่อนไหว สมาธิ และประสิทธิภาพการทำงานของสมอง",
    },
    {
        q: "โปรแกรมนี้เหมาะกับใครบ้าง",
        a: "เหมาะสำหรับผู้ที่มีปัญหาเรื่องสมดุล การทรงตัว เวียนศีรษะ สมาธิ รวมถึงผู้ที่ต้องการพัฒนาศักยภาพสมองและการเคลื่อนไหว",
    },
    {
        q: "ต้องมีการตรวจหรือประเมินก่อนเริ่มโปรแกรมหรือไม",
        a: "มีการประเมินเบื้องต้นโดยผู้เชี่ยวชาญ เพื่อวิเคราะห์อาการและออกแบบโปรแกรมให้เหมาะสมกับแต่ละบุคคล",
    },
    {
        q: "ใช้เวลาทำโปรแกรมนานเท่าไร",
        a: "ระยะเวลาแตกต่างกันตามเป้าหมายและผลการประเมิน โดยทั่วไปจะมีการวางแผนเป็นคอร์สและติดตามผลเป็นระยะ",
    },
    {
        q: "ต้องเตรียมตัวอย่างไรก่อนเข้ารับบริการ",
        a: "ควรพักผ่อนให้เพียงพอ สวมใส่เสื้อผ้าที่เคลื่อนไหวสะดวก และนำข้อมูลสุขภาพหรือประวัติการรักษาที่เกี่ยวข้องมาด้วย (ถ้ามี)",
    },
    {
        q: "โปรแกรมมีความปลอดภัยหรือไม่",
        a: "โปรแกรมถูกออกแบบและดูแลโดยผู้เชี่ยวชาญ พร้อมอุปกรณ์ที่ได้มาตรฐาน โดยคำนึงถึงความปลอดภัยของผู้รับบริการเป็นสำคัญ",
    },
    {
        q: "สามารถนัดหมายได้อย่างไร",
        a: "สามารถนัดหมายผ่านโทรศัพท์ LINE หรือแบบฟอร์มบนเว็บไซต์",
    },
    {
        q: "มีการติดตามผลหลังรับบริการหรือไม",
        a: "มีการประเมินผลเป็นระยะ เพื่อดูความก้าวหน้าและปรับโปรแกรมให้เหมาะสม",
    },
    {
        q: "ค่าใช้จ่ายประมาณเท่าไร",
        a: "ค่าใช้จ่ายขึ้นอยู่กับประเภทการประเมินและโปรแกรมที่เลือก แนะนำติดต่อศูนย์เพื่อรับข้อมูลแพ็กเกจล่าสุด",
    },
    {
        q: "สามารถติดต่อสอบถามเพิ่มเติมได้ช่องทางใด",
        a: "สามารถติดต่อผ่านช่องทางที่ระบุในหน้า Contact ของเว็บไซต์ เช่น โทรศัพท์ อีเมล หรือ LINE",
    },
];

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    return (
        <section className="bg-gradient-to-t from-[#FFFFFF] to-[#F3FCFA] py-14">
            <div className="max-w-5xl mx-auto px-3">
                <div className="flex flex-col items-center mb-8">
                    <img
                        src="/icons/Question.svg"
                        alt="Question"
                        className="inline-block w-7 h-7 align-middle mr-2"
                    />
                    <div className="items-center gap-2 text-[#16c79a] text-lg font-semibold mt-2">
                        <span className="text-xl font-semibold">คำถามที่พบบ่อย</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">
                        FAQ
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row-dense auto-rows-fr">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;

                        return (
                            <div
                                key={i}
                                className={`
                  border rounded-2xl overflow-hidden transition-all duration-300 ease-out
                  ${isOpen
                                        ? "border-2 border-tealPrimary bg-white row-span-2"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                    }
                `}
                            >
                                {/* Question Button */}
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => setOpenIndex(isOpen ? null : i)}
                                    className={`
    w-full flex items-center justify-between text-left px-6 py-5
    focus:outline-none group transition-colors duration-200
    ${isOpen ? "bg-emerald-50/40" : "hover:bg-emerald-50/30"}
  `}
                                >
                                    <span
                                        className={`
      font-semibold text-lg leading-relaxed pr-4 transition-colors duration-200
      ${isOpen ? "text-gray-900" : "text-gray-800 group-hover:text-gray-900"}
    `}
                                    >
                                        {item.q}
                                    </span>

                                    <div
                                        className={`
      flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center
      transition-all duration-200
      ${isOpen ? "bg-emerald-100 rotate-180" : "bg-gray-50 group-hover:bg-emerald-100"}
    `}
                                    >
                                        <svg
                                            className={`
        w-4 h-4 transition-colors duration-200
        ${isOpen ? "text-tealPrimary" : "text-gray-500 group-hover:text-tealPrimary"}
      `}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>


                                {/* Content (Outer: animate only) */}
                                <div
                                    className={`
                    overflow-hidden transition-all duration-500 ease-in-out
                    ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                  `}
                                    style={{
                                        maxHeight: isOpen
                                            ? (contentRefs.current[i]?.scrollHeight ?? 0) + "px"
                                            : "0px",
                                    }}
                                >
                                    {/* ✅ Inner: padding คงที่ ทำให้ระยะเท่ากันทุกข้อ */}
                                    <div
                                        ref={(el) => {
                                            contentRefs.current[i] = el;
                                        }}
                                        className="px-6 pb-6 text-gray-700 leading-relaxed select-text bg-gradient-to-b from-emerald-50/30 to-transparent"
                                    >
                                        <div className="bg-[#F5F5F5] p-2.5 rounded-2xl mb-4 pl-4 py-1">
                                            {item.a}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}