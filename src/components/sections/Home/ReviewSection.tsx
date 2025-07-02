import FadeInSection from './FadeInSection';
import { useState } from 'react';

const mockReviews = [
  {
    quote: 'แรกเริ่มจะได้ทำ brain map ก่อนเพื่อดูภาพรวมว่าเรามีปัญหาอะไรบ้าง จากนั้นจะได้พบผู้เชี่ยวชาญ...',
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
    quote: 'รู้สึกสบายใจที่ได้รับคำปรึกษาครับ อยากบอกต่อบริการเลยครับ',
    name: 'P.Kongno',
    date: '12/03/68',
    rate: '4.7',
  },
  {
    quote: 'บริการยอดเยี่ยมมากค่ะ ใส่ใจรายละเอียดจริงๆ',
    name: 'Nina T.',
    date: '10/03/68',
    rate: '4.9',
  },
  {
    quote: 'แรกเริ่มจะได้ทำ brain map ก่อนเพื่อดูภาพรวมว่าเรามีปัญหาอะไรบ้าง จากนั้นจะได้พบผู้เชี่ยวชาญ...',
    name: 'Anucha S.',
    date: '09/03/68',
    rate: '4.8',
  },
  {
    quote: 'ประทับใจตั้งแต่วันแรกที่เข้ารับบริการ',
    name: 'Nok N.',
    date: '08/03/68',
    rate: '5.0',
  },
];

export default function ReviewSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerPage = 3;

  const next = () => {
    setCurrentIndex((prev) =>
      prev + reviewsPerPage < mockReviews.length ? prev + reviewsPerPage : 0
    );
  };
  const prev = () => {
    setCurrentIndex((prev) =>
      prev - reviewsPerPage >= 0
        ? prev - reviewsPerPage
        : Math.max(mockReviews.length - reviewsPerPage, 0)
    );
  };

  return (
    <section
      id="reviews"
      className="py-20 px-6 bg-gradient-to-b from-white to-[#e0f2fe]"
    >
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <p className="text-teal-500 text-xl font-semibold">Review</p>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-1">
                รีวิวจากลูกค้า
              </h2>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <button
                onClick={prev}
                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                ◀
              </button>
              <button
                onClick={next}
                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                ▶
              </button>
            </div>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-800">
          {mockReviews
            .slice(currentIndex, currentIndex + reviewsPerPage)
            .map(({ quote, name, date, rate }, index) => (
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
