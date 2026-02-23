import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { SymptomArticle as Article } from '../../lib/symptomarticle';
import { HiOutlineArrowRight } from "react-icons/hi";

const ASSET_BASE = (import.meta.env.VITE_API_URL as string)?.replace(/\/api\/?$/, '') || '';
const toAbs = (u?: string | null) => (!u ? undefined : u.startsWith('http') ? u : `${ASSET_BASE}${u}`);

type Props = { articles: Article[]; };

export default function SymptomGrid({ articles }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const firstLoadRef = useRef(true);
    const navigate = useNavigate();

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w <= 640) setItemsPerPage(6);
            else if (w <= 1024) setItemsPerPage(9);
            else setItemsPerPage(12);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);


    useEffect(() => { setCurrentPage(1); }, [articles?.length, itemsPerPage]);

    const totalPages = Math.max(1, Math.ceil((articles?.length ?? 0) / itemsPerPage));

    useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return (articles ?? []).slice(start, start + itemsPerPage);
    }, [articles, currentPage, itemsPerPage]);

    useEffect(() => {
        if (firstLoadRef.current) { firstLoadRef.current = false; return; }
        headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [currentPage]);

    const getImageUrl = (item: Article) => {
        return (
            toAbs(item.banner?.image?.formats?.small?.url) ||
            toAbs(item.banner?.image?.formats?.thumbnail?.url) ||
            toAbs(item.banner?.image?.url) ||
            '/default-image.png'
        );
    };


    const getPages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            // หน้าน้อยแสดงทั้งหมด
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // หน้าแรกเสมอ
            pages.push(1);

            if (currentPage <= 3) {
                // อยู่หน้า -> 1 2 3 4 5 ... 10
                for (let i = 2; i <= 5; i++) pages.push(i);
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                // อยู่ท้าย -> 1 ... 6 7 8 9 10
                pages.push('...');
                for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push('...');
                pages.push(currentPage - 1);
                pages.push(currentPage);
                pages.push(currentPage + 1);
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    const filteredItems = useMemo(() => {
        return currentItems.filter((item) => {
            const hasDocId = !!item?.documentId;
            const title = (item?.banner?.title ?? item?.title ?? "").trim();
            const img =
                toAbs(item?.banner?.image?.formats?.small?.url) ||
                toAbs(item?.banner?.image?.formats?.thumbnail?.url) ||
                toAbs(item?.banner?.image?.url);

            // ✅ ถ้าขาดข้อมูลหลัก ไม่แสดงการ์ด
            return hasDocId && !!title && !!img;
        });
    }, [currentItems]);

    const pages = getPages();

    return (
        <section
            className="mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12"
            style={{ background: 'radial-gradient(82.55% 5% at 48.37% 0%, #DAFEF7 0%, rgba(245, 245, 245, 0.5) 75%)' }}
        >
            <h2
                ref={headingRef}
                className="
                        text-center text-32 sm:text-48 md:text-64 font-medium
                        bg-gradient-to-r from-[#1D2126] to-[#587973]
                        bg-clip-text text-transparent
                    "
            >
                อาการทางสมอง
            </h2>
            <h3 className="text-center text-[#3E3E44] text-20 sm:text-24 md:text-28 font-medium mb-7">12 อาการทางสมองที่เราให้คำปรึกษา</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 place-content-center px-4 sm:px-20 max-w-[1440px] mx-auto">
                {filteredItems.map((item) => {
                    const to = `/symptom-article/${item.documentId}?title=อาการ`;
                    const viewed = item.viewCountAndSocial?.viewed ?? 0;
                    const imgUrl = getImageUrl(item);
                    const displayTitle = item.banner?.title ?? item.title;

                    return (
                        <article key={item.id} className="h-full">
                            <div className="bg-white rounded-xl p-4 sm:p-5 transition hover:shadow-lg h-full flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute bottom-0 left-0 w-full h-[2px] pointer-events-none rounded-sm"
                                    style={{
                                        background: 'linear-gradient(90deg, #106EE8, #0FC1A1, #90E0AB)',
                                        filter: 'blur(1px)',
                                    }}
                                />
                                <Link to={to} className="block" aria-label={`อ่าน: ${displayTitle}`}>
                                    <div className="aspect-[16/10] overflow-hidden rounded-lg mb-4 bg-gray-50">
                                        <img
                                            src={imgUrl}
                                            alt={displayTitle}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold line-clamp-2">{displayTitle}</h3>
                                </Link>

                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-sm text-gray-500">👁 {viewed.toLocaleString()}</p>
                                    <button
                                        type="button"
                                        onClick={() => navigate(to)}
                                        aria-label={`เปิดบทความ ${displayTitle}`}
                                        className="flex items-center justify-center rounded-full shadow-md w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 text-white"
                                        style={{ background: 'linear-gradient(97.59deg, #106EE8 1.28%, #00AAFF 100%)', }}
                                    >
                                        <HiOutlineArrowRight
                                            className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                                        />
                                    </button>

                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="flex justify-center mt-10 gap-2 flex-wrap">
                {pages.map((page, idx) => {
                    const active = page === currentPage;

                    if (page === '...') {
                        return (
                            <div
                                key={`ellipsis-${idx}`}
                                className="w-9 h-9 sm:w-10 sm:h-10 inline-flex items-center justify-center rounded-[10px] text-base font-semibold text-gray-700 border-2 border-gray-200 bg-white"
                                aria-current={active ? 'page' : undefined}
                                aria-label={"..."}
                            >
                                ...
                            </div>
                        );
                    }
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page as number)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-[10px] border text-base font-semibold ${active
                                ? 'text-white'
                                : 'text-gray-700 border-2 border-gray-200 bg-white'
                                }`}
                            style={active ? { background: '#106EE8' } : undefined}
                            aria-current={active ? 'page' : undefined}
                            aria-label={`ไปหน้าที่ ${page}`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}
