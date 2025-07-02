export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden min-h-[80vh] sm:min-h-screen">
      {/* Background with Ken‑Burns effect */}
      <div className="absolute inset-0 z-0 animate-[ken-burns_40s_ease-out_infinite]">
        <img
          src="/brain-hero.png"
          alt="Neuro Balance Background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center pt-[22vh] pb-12 px-4 max-w-4xl mx-auto">
        <h1 className="font-semibold text-[clamp(1.25rem,4vw,2rem)] leading-tight text-gray-700 animate-slide-in-top">
          สมดุลภาพของชีวิตคุณเริ่มต้นที่นี่
        </h1>

        <h2
          className="text-hero font-poppins font-normal bg-clip-text text-transparent mt-2 animate-fade-in-up delay-150"
          style={{
            backgroundImage:
              'linear-gradient(180deg, #90E0AB 27.27%, #0FC1A1 40.27%, #106EE8 83.59%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Neuro Balance
        </h2>

        <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-gray-600 mt-3 font-normal animate-fade-in-up delay-300">
          เราทำการปรับสมดุลแบบองค์รวมด้วยนวัตกรรมและเทคโนโลยีที่ทันสมัย
        </p>

        <div className="mt-6 flex justify-center gap-3 animate-fade-in-up delay-500">
          <button className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition text-sm md:text-base font-semibold shadow-md">
            ปรึกษาฟรี
          </button>
          <button className="bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-full hover:bg-gray-100 transition text-sm md:text-base font-semibold shadow-sm">
            ติดต่อเรา
          </button>
        </div>
      </div>

      {/* Bottom wave */}
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
