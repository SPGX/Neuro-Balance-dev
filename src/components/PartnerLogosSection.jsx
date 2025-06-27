export default function PartnerLogosSection() {
  return (
    <section className="bg-white  pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          พาร์ทเนอร์ <span className="text-teal-500">ของเรา</span>
        </h2>
      </div>

      <div className="max-w-xl mx-auto flex justify-center items-center">
        <img
          src="/partner-logos.png"
          alt="Partner Logos"
          className="w-full max-w-4xl object-contain"
        />
      </div>
    </section>
  );
}
