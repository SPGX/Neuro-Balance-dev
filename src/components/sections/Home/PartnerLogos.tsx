const logos = [
  '/images/partner1.png',
  '/images/partner2.png',
  '/images/partner3.png',
  '/images/partner4.png',
  '/images/partner5.png'
]

export default function PartnerLogos() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-6">
          พาร์ทเนอร์ของเรา
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center justify-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={logo}
                alt={`partner-${index}`}
                className="h-12 sm:h-14 object-contain grayscale hover:grayscale-0 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
