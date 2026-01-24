// src/components/common/VideoSwiper.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

type VideoItem = { id: number | string; url: string };
type Props = {
    title?: string;
    subtitle?: string;
    videos: VideoItem[];
    className?: string;
};

const toId = (url: string) => {
    const m = url.match(/(?:youtu\.be\/|v=|embed\/)([^&?/]+)/);
    return m ? m[1] : '';
};

export default function VideoSwiper({
    title = 'รีวิวจากช่องทางอื่นๆ',
    subtitle = 'สามารถเลือกชมจากช่องทาง Youtube',
    videos,
    className = '',
}: Props) {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    const slides = useMemo(
        () =>
            videos
                .map((v) => ({ id: v.id, vid: toId(v.url) }))
                .filter((s) => !!s.vid),
        [videos]
    );

    return (
        <section className={`bg-white py-10 md:py-12 px-4 md:px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-600 mt-2 text-base">{subtitle}</p>
                </div>
                <div className="h-px w-full bg-gray-200 mb-6" />
                <div className="relative">
                    <button
                        ref={prevRef}
                        aria-label="prev"
                        className="hidden sm:flex absolute left-[-12px] md:left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m15.41 7.41l-1.41-1.41l-6 6l6 6l1.41-1.41l-4.59-4.59z" /></svg>
                    </button>

                    <button
                        ref={nextRef}
                        aria-label="next"
                        className="hidden sm:flex absolute right-[-12px] md:right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m8.59 16.59l1.41 1.41l6-6l-6-6l-1.41 1.41l4.59 4.59z" /></svg>
                    </button>

                    <Swiper
                        modules={[Navigation]}
                        onBeforeInit={(swiper) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                        }}
                        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
                        spaceBetween={20}
                        breakpoints={{
                            0: { slidesPerView: 1.05 },
                            640: { slidesPerView: 1.5 },
                            768: { slidesPerView: 2.1 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {slides.map((s) => (
                            <SwiperSlide key={s.id}>
                                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                                    <div className="aspect-video w-full">
                                        <LiteYouTube id={s.vid} />
                                    </div>
                                    <div className="h-[4px] w-full bg-gradient-to-r from-sky-500 to-emerald-500" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

function LiteYouTube({ id }: { id: string }) {
    const [active, setActive] = useState(false);
    const [thumbLoaded, setThumbLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const rootRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting && imgRef.current && !imgRef.current.src) {
                        imgRef.current.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
                    }
                }
            },
            { rootMargin: '200px' }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [id]);

    return (
        <div ref={rootRef} className="w-full h-full">
            {active ? (
                <iframe
                    className="w-full h-full"
                    title={`youtube-${id}`}
                    src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                />
            ) : (
                <button
                    onClick={() => setActive(true)}
                    className="relative w-full h-full group"
                    aria-label="Play video"
                >
                    <img
                        ref={imgRef}
                        alt=""
                        className={`w-full h-full object-cover ${thumbLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                        onLoad={() => setThumbLoaded(true)}
                        decoding="async"
                    />
                    {!thumbLoaded && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 group-hover:bg-white shadow flex items-center justify-center transition-colors">
                            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-black"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                    </div>
                </button>
            )}
        </div>
    );
}
