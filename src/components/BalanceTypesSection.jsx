import { useInView } from "react-intersection-observer";

export default function BalanceTypesSection() {
  const options = { triggerOnce: true, threshold: 0.2 };

  const { ref: card1Ref, inView: card1In } = useInView(options);
  const { ref: card2Ref, inView: card2In } = useInView(options);

  return (
    <section className="bg-gradient-to-t from-white to-[#e6fdfa] py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
          ประเภทของ <span className="text-teal-500">สมดุลสุขภาพ</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* ------------- Card 1 ------------- */}
        <div
          ref={card1Ref}
          className={`bg-white p-8 rounded-2xl shadow-md transition duration-500 ease-out hover:shadow-xl hover:scale-105
                      ${card1In ? "animate-fade-in-up" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-6 mb-4">
            <img src="/icon-brain.png" alt="Neuro icon" className="w-24 h-24 object-contain" />
            <h3 className="text-xl font-semibold text-teal-600">Neuro Balance</h3>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            กระบวนการที่ช่วยปรับปรุงความสมดุลให้แก่สมอง
            และเพิ่มประสิทธิภาพการทำงานของสมองให้ดียิ่งขึ้น
            สร้างการสื่อประสาทเพื่อรักษาสมดุลในสมองที่ได้รับการกระตุ้นพัฒนาเรื่องความจำ
          </p>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            รายละเอียด
          </button>
        </div>

        {/* ------------- Card 2 ------------- */}
        <div
          ref={card2Ref}
          className={`bg-white p-8 rounded-2xl shadow-md transition duration-500 ease-out hover:shadow-xl hover:scale-105
                      ${card2In ? "animate-fade-in-up delay-200" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center gap-6 mb-4">
            <img src="/icon-bio.png" alt="Bio icon" className="w-24 h-24 object-contain" />
            <h3 className="text-xl font-semibold text-teal-600">Bio Balance</h3>
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            กระบวนการที่ช่วยปรับปรุงความสมดุลให้แก่สมอง
            และเพิ่มประสิทธิภาพการทำงานของสมองให้ดียิ่งขึ้น
            สร้างการสื่อประสาทเพื่อรักษาสมดุลในสมองที่ได้รับการกระตุ้นพัฒนาเรื่องความจำ
          </p>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 transition">
            รายละเอียด
          </button>
        </div>
      </div>

    </section>
  );
}
