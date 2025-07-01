import React from "react";

const services = [
  "/services1.png",
  "/services2.png",
  "/services3.png",
];

export default function OurServices() {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10">บริการของเรา</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((src, index) => (
          <div
            key={index}
            className="rounded-[30px] shadow-xl overflow-hidden transition-transform duration-200 ease-out transform hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={src}
              alt={`services${index + 1}`}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
