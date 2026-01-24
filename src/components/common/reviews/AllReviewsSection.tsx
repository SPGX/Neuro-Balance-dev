import React, { useEffect, useMemo, useState } from 'react';

export type ReviewItem = {
    id: number | string;
    review: string;
    fullReview?: string;
    score: number;
    userName: string;
    date: string;
    avatarUrl?: string;
};

type Props = {
    title?: string;
    subtitle?: string;
    reviews: ReviewItem[];
    pageSize?: number;
    mobilePageSize?: number;
    className?: string;
    truncateAt?: number;
    totalCount?: number;
    page?: number;
    onPageChange?: (page: number) => void;
    loadingPage?: boolean;
    scrollTargetId?: string;
    scrollOffset?: number;
    mobileMaxWidth?: number;
};

export default function AllReviewsSection({
    title = 'รีวิวทั้งหมด',
    subtitle = 'ความประทับใจของลูกค้ากับบริการของเรา',
    reviews,
    pageSize = 9,
    mobilePageSize = 4,
    className = '',
    truncateAt = 180,
    totalCount,
    page: controlledPage,
    onPageChange,
    loadingPage = false,
    scrollTargetId = 'reviews-all',
    scrollOffset = 120,
    mobileMaxWidth = 640,
}: Props) {
    const [isMobile, setIsMobile] = useState(false);
    const [uncontrolledPage, setUncontrolledPage] = useState(1);
    const [modalItem, setModalItem] = useState<ReviewItem | null>(null);

    useEffect(() => {
        const mq = window.matchMedia(`(max-width: ${mobileMaxWidth}px)`);
        const apply = () => setIsMobile(mq.matches);
        apply();
        mq.addEventListener ? mq.addEventListener('change', apply) : mq.addListener(apply);
        return () => {
            mq.removeEventListener ? mq.removeEventListener('change', apply) : mq.removeListener(apply);
        };
    }, [mobileMaxWidth]);

    const effectivePageSize = Math.max(1, isMobile ? mobilePageSize : pageSize);
    const isControlled = controlledPage !== undefined && !!onPageChange;
    const page = isControlled ? controlledPage! : uncontrolledPage;

    const effectiveTotal = typeof totalCount === 'number' ? totalCount : reviews.length;
    const totalPages = Math.max(1, Math.ceil(effectiveTotal / effectivePageSize));

    const pageItems = useMemo(() => {
        if (isControlled) return reviews.slice(0, effectivePageSize);
        const start = (page - 1) * effectivePageSize;
        return reviews.slice(start, start + effectivePageSize);
    }, [isControlled, reviews, page, effectivePageSize]);

    const pages = useMemo(() => {
        const p: (number | '…')[] = [];
        const add = (n: number | '…') => (p.includes(n) ? null : p.push(n));
        add(1);
        if (page > 3) add('…');
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) add(i);
        if (page < totalPages - 2) add('…');
        if (totalPages > 1) add(totalPages);
        return p;
    }, [page, totalPages]);

    const go = (next: number) => {
        if (isControlled) onPageChange!(next);
        else setUncontrolledPage(next);
        const el = document.getElementById(scrollTargetId);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - scrollOffset;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className={`w-full py-10 md:py-12 px-4 md:px-6 lg:px-8 ${className}`}>
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-6 md:mb-8" id={scrollTargetId}>
                    <div className="text-[#4BB59A] font-semibold text-sm md:text-base">{title}</div>
                    <h2 className="text-[#1E3D39] text-[22px] md:text-[28px] font-extrabold mt-1">{subtitle}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {loadingPage
                        ? Array.from({ length: Math.min(effectivePageSize, 12) }).map((_, i) => (
                            <div key={i} className="rounded-2xl bg-gray-100 p-5 animate-pulse h-48" />
                        ))
                        : pageItems.map((it) => {
                            const base = String(it.fullReview || it.review || '');
                            const looksLong = base.length > truncateAt;
                            return (
                                <article
                                    key={it.id}
                                    className="rounded-2xl bg-gray-100 shadow-md border border-gray-100 p-5 flex flex-col"
                                >
                                    <div className="flex items-center gap-1 text-[#F9D24A] mb-2">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} filled={i < Math.round(it.score || 0)} />
                                        ))}
                                        <span className="ml-2 text-[#1E3D39] text-sm font-semibold">
                                            {Number.isFinite(it.score) ? it.score.toFixed(1) : '-'}
                                        </span>
                                    </div>

                                    <div className="text-[#2F4C47] whitespace-pre-line line-clamp-3 flex-1">
                                        {base}
                                    </div>

                                    <div className="mt-2">
                                        {looksLong && (
                                            <button
                                                type="button"
                                                className="text-[#007AFF] underline underline-offset-2"
                                                onClick={() => setModalItem(it)}
                                            >
                                                ทั้งหมด
                                            </button>
                                        )}
                                    </div>

                                    <div className="mt-5 flex items-center gap-3 border-t pt-4">
                                        <Avatar name={it.userName} src={it.avatarUrl} />
                                        <div>
                                            <div className="text-[#1E3D39] font-semibold text-sm">{it.userName}</div>
                                            <div className="text-[#88A6A1] text-xs">{it.date}</div>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                </div>

                <div className="mt-8 flex justify-center">
                    <nav className="flex items-center gap-2">
                        <button
                            onClick={() => go(Math.max(1, page - 1))}
                            disabled={page === 1}
                            className={`w-9 h-9 rounded-full border ${page === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'} flex items-center justify-center`}
                            aria-label="Previous"
                        >
                            ‹
                        </button>

                        {pages.map((p, idx) =>
                            p === '…' ? (
                                <span key={`e-${idx}`} className="px-2 text-gray-400 select-none">…</span>
                            ) : (
                                <button
                                    key={p}
                                    onClick={() => go(p)}
                                    className={`min-w-9 h-9 px-3 rounded-full border flex items-center justify-center text-sm ${page === p ? 'bg-[#0FC1A1] text-white border-[#0FC1A1]' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                                    aria-current={page === p ? 'page' : undefined}
                                >
                                    {p}
                                </button>
                            )
                        )}

                        <button
                            onClick={() => go(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages}
                            className={`w-9 h-9 rounded-full border ${page === totalPages ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'} flex items-center justify-center`}
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </nav>
                </div>
            </div>

            {modalItem && (
                <Modal onClose={() => setModalItem(null)}>
                    <article className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar name={modalItem.userName} src={modalItem.avatarUrl} />
                            <div>
                                <div className="text-[#1E3D39] font-semibold">{modalItem.userName}</div>
                                <div className="text-[#88A6A1] text-sm">{modalItem.date}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#F9D24A] mb-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} filled={i < Math.round(modalItem.score || 0)} />
                            ))}
                            <span className="ml-2 text-[#1E3D39] text-sm font-semibold">
                                {Number.isFinite(modalItem.score) ? modalItem.score.toFixed(1) : '-'}
                            </span>
                        </div>

                        <div className="text-[#2F4C47] whitespace-pre-line">
                            {modalItem.fullReview || modalItem.review}
                        </div>
                    </article>
                </Modal>
            )}
        </section>
    );
}

function Star({ filled }: { filled: boolean }) {
    return (
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill={filled ? '#F9D24A' : '#E6EAE9'}>
            <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
    );
}

function Avatar({ name, src }: { name: string; src?: string }) {
    const [errored, setErrored] = React.useState(false);
    const initials = getInitials(name);
    if (src && !errored) {
        return (
            <img
                src={src}
                alt={name}
                className="w-9 h-9 rounded-full object-cover"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() => setErrored(true)}
            />
        );
    }
    return (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-xs font-semibold">
            {initials}
        </div>
    );
}

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return 'U';
    if (parts.length === 1) return Array.from(parts[0])[0]?.toUpperCase() ?? 'U';
    const a = Array.from(parts[0])[0] ?? '';
    const b = Array.from(parts[parts.length - 1])[0] ?? '';
    return (a + b).toUpperCase();
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl p-6 relative">
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 rounded-full w-8 h-8 bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
