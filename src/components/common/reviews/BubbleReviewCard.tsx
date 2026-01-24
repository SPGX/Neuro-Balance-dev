import React, { useState } from 'react';

export type BubbleItem = {
    id: number;
    review: string;
    score: number;
    userName: string;
    date: string;
    avatarUrl?: string;
};

export default function BubbleReviewCard({ item }: { item: BubbleItem }) {
    const [open, setOpen] = useState(false);
    const MAX_LEN = 180;
    const isLong = (item.review || '').length > MAX_LEN;

    return (
        <>
            <article className="relative rounded-[28px] bg-[#F3F4F6] p-6 md:p-8 pb-14 md:pb-16">
                <img
                    src="/comma.svg"
                    alt=""
                    className="absolute left-6 top-6 w-10 h-10 opacity-60 select-none pointer-events-none"
                />
                <div className="absolute right-6 top-6 flex items-center gap-1 text-sm font-semibold text-[#1E3D39]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#F9D24A"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                    >
                        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                    </svg>
                    {Number.isFinite(item.score) ? item.score.toFixed(1) : '-'}
                </div>

                <div className="mt-16 text-[#1E3D39] whitespace-pre-line leading-relaxed">
                    {isLong ? item.review.slice(0, MAX_LEN) + ' ...' : item.review}
                    {isLong && (
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="text-[#007AFF] ml-1"
                        >
                            ทั้งหมด
                        </button>
                    )}
                </div>

                <div className="absolute bottom-0 -left-0 flex items-center gap-3 bg-white rounded-tr-2xl px-4 py-2 pl-2">
                    <Avatar name={item.userName} src={item.avatarUrl} />
                    <div>
                        <div className="text-[#1E3D39] font-semibold text-sm">{item.userName}</div>
                        <div className="text-[#88A6A1] text-xs">{item.date}</div>
                    </div>
                </div>
            </article>

            {open && (
                <Modal onClose={() => setOpen(false)}>
                    <article className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Avatar name={item.userName} src={item.avatarUrl} />
                            <div>
                                <div className="text-[#1E3D39] font-semibold">{item.userName}</div>
                                <div className="text-[#88A6A1] text-sm">{item.date}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#1E3D39] font-semibold mb-3">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="#F9D24A"
                                viewBox="0 0 24 24"
                                className="w-5 h-5"
                            >
                                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.2 22 12 18.56 5.8 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
                            </svg>
                            {Number.isFinite(item.score) ? item.score.toFixed(1) : '-'}
                        </div>

                        <div className="text-[#2F4C47] whitespace-pre-line leading-relaxed">
                            {item.review}
                        </div>
                    </article>
                </Modal>
            )}
        </>
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
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? 'U';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
                        aria-label="Close"
                    >
                        ✕
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
}
