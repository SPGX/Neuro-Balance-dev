export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/brain-hero.png"
          alt="Neuro Balance Background"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="relative z-10 text-center pt-10 md:pt-24 pb-12 px-4 max-w-5xl mx-auto">
        <h1
          className="font-semibold text-[24px] leading-[100%] tracking-normal text-gray-700"
        >
          สมดุลภาพของชีวิตคุณเริ่มต้นที่นี่
        </h1>

        <h2
          className="text-[48px] md:text-[128px] font-normal leading-[100%] bg-clip-text text-transparent mt-3"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #90E0AB 27.27%, #0FC1A1 40.27%, #106EE8 83.59%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Neuro Balance
        </h2>

        <p className="text-base md:text-lg text-gray-600 mt-4 font-normal">
          เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-base font-semibold shadow-md">
            ปรึกษาฟรี
          </button>
          <button className="bg-white border border-gray-300 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-100 transition text-base font-semibold shadow-sm">
            ติดต่อเรา
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path fill="#ffffff" d="M0,0 C480,100 960,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}
