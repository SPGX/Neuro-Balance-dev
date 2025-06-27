import FadeInSection from './FadeInSection';

const reasons = [
  {
    icon: '/feedback1.png',
    title: 'มั่นใจ ปลอดภัย ไม่ใช้ยา',
    desc: 'กระบวนการของเราปลอดภัย มีประสิทธิภาพสูงและไม่มีการใช้ยา',
  },
  {
    icon: '/feedback2.png',
    title: 'ปรับสมดุลร่างกาย',
    desc: 'ด้วยกระบวนการ Bio Balance สามารถปรับสมดุลของร่างกายให้สมดุลและแข็งแรง',
  },
  {
    icon: '/feedback3.png',
    title: 'ปรับสมดุลสมอง',
    desc: 'เราทำการปรับสมดุลของสมองด้วยเทคนิคการทำ Neurofeedback เพื่อเสริมประสิทธิภาพสมอง',
  },
  {
    icon: '/feedback4.png',
    title: 'เพิ่มศักยภาพของสมอง',
    desc: 'ช่วยเพิ่มศักยภาพด้านการเรียนรู้ ความจำ และการคิดวิเคราะห์ให้ดียิ่งขึ้น',
  },
  {
    icon: '/feedback5.png',
    title: 'คุณภาพชีวิตที่ดีขึ้น',
    desc: 'สมอง ร่างกาย และจิตใจที่ดีขึ้น นำไปสู่คุณภาพชีวิตที่ดียิ่งขึ้น',
  },
  {
    icon: '/feedback6.png',
    title: 'เห็นผลในระยะยาว',
    desc: 'ผลลัพธ์จากการฝึก Neurofeedback อยู่ได้นาน และไม่มีผลข้างเคียง',
  },
];

export default function NeuroFeedbackSection() {
  return (
    <section className="py-20 px-4 md:px-10">
      <div className="max-w-4xl mx-auto text-center mb-14">
        <p className="text-teal-500 font-bold text-base md:text-lg mb-1">Neurofeedback</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">ทำไมต้อง</h2>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">NEUROBALANCE</h1>
        <p className="text-gray-600 text-sm md:text-base">
          เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        {reasons.map(({ icon, title, desc }, i) => (
          <FadeInSection key={i}>
            <div className="flex flex-col items-center text-center px-4">
              <img src={icon} alt={title} className="w-20 h-20 mb-4 animate-float-y" />
              <h4 className="font-semibold text-gray-800 mb-1 text-base md:text-lg">{title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{desc}</p>
            </div>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}