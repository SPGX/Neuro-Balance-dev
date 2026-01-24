import React from 'react';

export default function SectionHeading({
    eyebrow = 'ความประทับใจ',
    title = 'ของลูกค้ากับบริการของเรา',
}: { eyebrow?: string; title?: string }) {
    return (
        <section className="text-center py-10 md:py-14">
            <div className="text-[#4BB59A] font-semibold text-sm md:text-base">{eyebrow}</div>
            <h2 className="text-[#1E3D39] text-[28px] md:text-[40px] font-extrabold mt-1">{title}</h2>
        </section>
    );
}
