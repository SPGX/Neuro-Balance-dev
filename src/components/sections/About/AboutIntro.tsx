import { useInView } from 'react-intersection-observer';

export default function AboutNeuroBalance() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="relative bg-white py-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto border-t-4 border-teal-500 rounded-t-[32px] p-8 md:p-12 overflow-hidden">
        <div
          ref={ref}
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <div className="text-gray-800">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Neuro Balance
            </h2>
            <h3 className="text-lg text-teal-500 font-semibold mb-6">
              การสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย
            </h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Neuro Balance</strong>{' '}
              คือศูนย์ฟื้นฟูสุขภาพแบบองค์รวมแนวทางใหม่ที่รวบรวมเทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก
              ซึ่งเป็นที่ยอมรับ มีมาตรฐาน และผลวิจัยรับรอง โดยทางศูนย์มีผู้เชี่ยวชาญทางด้านสุขภาพคอยดูแลแนะนำ
              และให้คำปรึกษาที่มีประโยชน์กับลูกค้าตลอดการเข้ารับบริการ
              ที่ Neuro Balance เรามุ่งเน้นในการปรับความสมดุลด้านสุขภาพแบบองค์รวม
              ไม่ว่าจะเป็นระบบไฟฟ้าของสมอง หรือระบบของเหลวภายในร่างกาย
            </p>
          </div>
          <img
            src="/about-neuro.png"
            alt="Neuro Balance Brain Technology"
            className="w-full max-w-md md:max-w-lg mx-auto animate-float-y"
          />

        </div>
      </div>
    </section>
  );
}
