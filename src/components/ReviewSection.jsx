import FadeInSection from './FadeInSection';

export default function ReviewSection() {
  return (
    <section
      id="reviews"
      className="py-20 px-6 bg-gradient-to-b from-white to-[#e0f2fe]"
    >

      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-teal-500 text-xl font-semibold">Review</p>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-1">
                รีวิวจากลูกค้า
              </h2>
            </div>
            <a
              href="#"
              className="text-blue-600 font-semibold hover:underline transition"
            >
              ดูทั้งหมด
            </a>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          {[
            {
              quote:
                'แรกเริ่มจะได้ทำ brain map ก่อนเพื่อดูภาพรวมว่าเรามีปัญหาอะไรบ้าง จากนั้นจะได้พบผู้เชี่ยวชาญ...',
              name: 'YU',
              date: '12/03/68',
              rate: '4.8',
            },
            {
              quote: 'แนะนำเลยครับ บริการดีมาก มีความมืออาชีพสูง',
              name: 'Panupong Kongno',
              date: '12/03/68',
              rate: '4.8',
            },
            {
              quote:
                'รู้สึกสบายใจที่ได้รับคำปรึกษาครับ อยากบอกต่อบริการเลยครับ',
              name: 'P.Kongno',
              date: '12/03/68',
              rate: '4.7',
            },
          ].map(({ quote, name, date, rate }, index) => (
            <FadeInSection key={index}>
              <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full justify-between relative">
                <div className="absolute top-5 right-5 text-yellow-500 font-bold text-sm flex items-center gap-1">
                  ⭐ {rate}
                </div>
                <div className="text-6xl text-black font-serif leading-none mb-4">
                  “
                </div>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {quote}
                </p>
                <div className="pt-4 border-t flex items-center gap-3 mt-auto">
                  <img
                    src="/user.png"
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-sm">{name}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
