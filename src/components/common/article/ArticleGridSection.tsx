import React, { useState, useEffect, useRef } from 'react';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Article {
  id: number;
  documentId: string;
  Title: string;
  date: string;
  viewd: number;
  image: { formats?: { small?: { url: string } }; url: string };
  banner?: { title?: string };
}

interface Props {
  articles: Article[];
}

const CONTAINER = 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8';

export default function ArticleGridSection({ articles }: Props) {
  const RAW_BASE = import.meta.env.VITE_API_URL || '';
  const BASE_URL = RAW_BASE.replace(/\/api\/?$/, '');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 640) setItemsPerPage(3);
      else if (w <= 1024) setItemsPerPage(8);
      else setItemsPerPage(12);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    headingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const totalPages = Math.max(1, Math.ceil(articles.length / itemsPerPage));
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = articles.slice(start, start + itemsPerPage);

  const toAbs = (u?: string) => {
    if (!u) return '/default-image.svg';
    return /^https?:\/\//i.test(u) ? u : `${BASE_URL}${u}`;
  };

  const renderImage = (img: Article['image']) => {
    const url = img.formats?.small?.url || img.url;
    return toAbs(url);
  };

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage <= 3) {
        for (let i = 2; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push('...');
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push('...', totalPages);
      }
    }
    return pages;
  };

  const pages = getPages();

  return (
    <section
      className="py-8 sm:py-12"
      style={{
        background: 'radial-gradient(82.55% 100% at 48.37% 0%, #DAFEF7 0%, rgba(245, 245, 245, 0.5) 75%)',
      }}
    >
      <div className={CONTAINER}>
        <h2 ref={headingRef} className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10">
          บทความ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {currentItems.map((item) => {
            const displayTitle = item.banner?.title ?? item.Title;
            return (
              <Link
                key={item.documentId}
                to={`/article/${encodeURIComponent(item.documentId)}`}
                className="block group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-2xl"
                aria-label={displayTitle}
              >
                <div className="bg-white rounded-2xl shadow overflow-hidden flex flex-col transition-transform group-hover:-translate-y-0.5 h-full">
                  <div className="relative aspect-[14/10] sm:aspect-[3/2] w-full">
                    <img
                      src={renderImage(item.image)}
                      alt={displayTitle}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    />
                  </div>

                  <div className="p-3 sm:p-4 flex flex-col flex-grow h-full">
                    <p className="text-[#0FC1A1] text-xs font-bold">Blog</p>
                    <h3 className="text-blackText text-sm sm:text-base font-bold leading-snug line-clamp-2">{displayTitle}</h3>

                    <div className="flex flex-col flex-grow justify-between mt-1 sm:mt-2">
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center text-xs text-gray-500 gap-2">
                          <span>
                            {new Date(item.date).toLocaleDateString('th-TH', {
                              day: '2-digit',
                              month: '2-digit',
                              year: '2-digit',
                              timeZone: 'Asia/Bangkok',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {Number(item.viewd || 0).toLocaleString()}
                          </span>
                        </div>

                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-white text-xs sm:text-sm shadow-md">
                          <img src="/icons/ArrowRight.svg" alt="Arrow Right" className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
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
                >
                  ...
                </div>
              );
            }
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page as number)}
                className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-[10px] border text-base font-semibold ${active ? 'text-white' : 'text-gray-700 border-2 border-gray-200 bg-white'
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
      </div>
    </section>
  );
}
