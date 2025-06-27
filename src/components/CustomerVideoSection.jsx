import FadeInSection from './FadeInSection';

export default function CustomerVideoSection() {
  return (
    <section id="customer-video" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <FadeInSection>
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">ความประทับใจของลูกค้า</h2>
            <button className="bg-white border border-blue-500 text-blue-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-50 transition">
              ดูเพิ่มเติม →
            </button>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative max-w-3xl w-full border border-gray-300 rounded-xl overflow-hidden shadow-lg">
              <img
                src="/phone.png"
                alt="iPhone Frame"
                className="w-full h-auto object-contain"
              />
              <div className="absolute top-[9%] left-[11.5%] w-[77%] h-[82%] rounded-xl overflow-hidden">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/HbrX4GFwUxI"
                  title="ความจำดี สุขภาพดี มีความสุข"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
