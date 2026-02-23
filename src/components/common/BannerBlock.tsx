import React from "react";

type BannerBlockProps = {
    img: string;
    height?: number | string; // ถ้าส่งมา จะ override ทั้งหมด
    title: string;
    des: string;
    rightTitle: string;
    rightDesc: string;
    className?: string;
};

function toCssHeight(h?: number | string) {
    if (h === undefined || h === null) return undefined; // ✅ ให้ใช้ class คุม default
    return typeof h === "number" ? `${h}px` : h;
}

export default function BannerBlock({
    img,
    height,
    title,
    des,
    rightTitle,
    rightDesc,
    className = "",
}: BannerBlockProps) {
    return (
        <section
            className={[
                "relative w-full overflow-hidden rounded-[22px]",
                "shadow-[0_18px_50px_rgba(0,0,0,0.10)]",
                "h-[320px] sm:h-[540px]", // ✅ mobile 320px, sm+ 540px
                className,
            ].join(" ")}
            style={height ? { height: toCssHeight(height) } : undefined} // ✅ ถ้าส่ง height มาให้ใช้ค่านั้น
        >
            <img
                src={img}
                alt=""
                aria-hidden
                className="absolute inset-0 h-full w-full object-cover"
                draggable={false}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-black/25" />

            <div className="relative z-10 h-full w-full px-5 sm:px-7 md:px-10 py-5 sm:py-6">
                <div className="h-full w-full flex flex-col md:flex-row md:justify-between gap-6">
                    <div className="mt-auto md:mt-0 md:self-end">
                        <div className="inline-block rounded-[16px] px-5 py-4">
                            <div className="text-white/90 font-semibold text-2xl leading-none">{title}</div>

                            <div className="mt-2 flex items-end gap-3">
                                <div className="text-white font-extrabold leading-none text-[46px] sm:text-[56px] md:text-[64px]">
                                    {des}
                                </div>

                                <div className="leading-none">
                                    <span className="inline-flex items-center rounded-sm bg-[#2CC9A6] px-4 py-2 text-white font-extrabold text-[34px] sm:text-[40px] md:text-[44px]">
                                        Balance
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT (center) — ซ่อนบน mobile */}
                    <div className="hidden sm:block md:self-end max-w-xl md:max-w-[720px] md:flex flex-row">
                        <p className="mt-3 text-white/95 text-lg sm:text-md md:text-md leading-relaxed font-medium">
                            {rightTitle && <span className="inline-block rounded-sm mr-2 bg-[#2CC9A6] px-2 py-1 text-white font-medium text-md sm:text-[18px] whitespace-nowrap align-middle">
                                {rightTitle}
                            </span>}
                            {rightDesc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}