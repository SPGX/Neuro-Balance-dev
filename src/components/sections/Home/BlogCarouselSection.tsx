import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import { Link } from "react-router-dom";
import type { GridArticle } from "../../../pages/HomePage";

type Props = { articles: GridArticle[] };

export default function BlogCarouselSection({ articles }: Props) {
    const RAW_BASE = import.meta.env.VITE_API_URL || "";
    const BASE_URL = RAW_BASE.replace(/\/api\/?$/, "");
    const toAbs = (u?: string) => (!u ? "/default-image.svg" : /^https?:\/\//i.test(u) ? u : `${BASE_URL}${u}`);

    const mapped = (articles || []).map(a => ({
        id: a.id,
        image: toAbs(a.image?.formats?.small?.url || a.image?.url),
        tag: "Blog",
        title: a.Title,
        date: a.date,
        views: a.viewd ?? 0,
        href: `/article/${encodeURIComponent(a.documentId)}`,
    }));

    return (
        <section className="py-10 px-2 bg-white overflow-x-hidden">
            <div className="flex flex-col items-center mb-10 mt-10">
                <div className="flex flex-col items-center gap-2">
                    <img src="/icons/Note.svg" className="w-8 h-8 mb-2" alt="note" />
                    <span className="text-[#16c79a] text-base font-semibold">บทความที่น่าสนใจ</span>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-1 tracking-tight">Blog</h2>
            </div>

            <div className="relative max-w-5xl mx-auto">
                <Swiper
                    className="p-2"
                    modules={[Navigation, Pagination]}
                    navigation={{ nextEl: ".swiper-button-next-blog", prevEl: ".swiper-button-prev-blog" }}
                    pagination={{ clickable: true, el: ".swiper-pagination-blog" }}
                    spaceBetween={24}
                    breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                >
                    {mapped.map(b => (
                        <SwiperSlide key={b.id}>
                            <BlogCard {...b} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button className="swiper-button-prev-blog absolute top-1/2 -left-16 z-10 hidden lg:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow border border-gray-200 hover:bg-gray-100 transition -translate-y-1/2">
                    <svg width="24" height="24" fill="none" stroke="#1D2126" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button className="swiper-button-next-blog absolute top-1/2 -right-16 z-10 hidden lg:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow border border-gray-200 hover:bg-gray-100 transition -translate-y-1/2">
                    <svg width="24" height="24" fill="none" stroke="#1D2126" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className="swiper-pagination-blog block lg:hidden mt-4 text-center" />
                <style>{`.swiper-pagination-blog .swiper-pagination-bullet{margin:0 4px!important;}`}</style>
            </div>

            <div className="flex justify-center mt-10">
                <Link to="/article" className="px-7 py-2 bg-[#f7f7f8] text-gray-700 rounded-full font-semibold shadow-sm hover:bg-gray-200 transition">
                    ดูทั้งหมด
                </Link>
            </div>
        </section>
    );
}
