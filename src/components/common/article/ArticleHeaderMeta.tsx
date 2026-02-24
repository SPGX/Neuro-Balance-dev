import React, { useState } from 'react';
import { CalendarDays, Eye } from 'lucide-react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ArticleHeaderMetaProps {
    title: string;
    date: string;
    viewCount: number;
    socialLinks: {
        facebook?: string;
        line?: string;
        twitter?: string;
        email?: string;
    };
    likeCount: number;
}

export default function ArticleHeaderMetaAccordion({
    title,
    date,
    viewCount,
    socialLinks,
    likeCount,
}: ArticleHeaderMetaProps) {
    const [open, setOpen] = useState(true);

    const formattedDate = new Date(date).toLocaleDateString('th-TH', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        // <div className="bg-[#F9FAFB] rounded-2xl overflow-hidden shadow-sm mb-6">
        <div className="mb-6 max-w-[1440px] mx-auto">
            {/* Header */}
            {/* <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left text-black font-semibold text-lg focus:outline-none"
            >
                <span>{title}</span>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button> */}

            <p className="text-tealPrimary text-xs md:text-sm font-bold">Blog</p>
            <h1
                onClick={() => setOpen(!open)}
                className="w-full pb-4 text-left text-black font-semibold text-lg"
            >
                <span>{title}</span>
            </h1>

            {/* Body */}
            {/* {open && ( */}
                <div className="text-sm text-gray-600 flex flex-row items-center justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <CalendarDays size={16} />
                            <span>{formattedDate}</span>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <Eye size={16} />
                            <span>{viewCount.toLocaleString()} เข้าชม</span>
                        </div> */}
                    </div>

                    {/* Social Links */}
                    {/* <div className="flex items-center gap-3 flex-wrap justify-end">
                        <div className="flex items-center gap-3 justify-end">
                            <a className="font-medium text-black flex flex-row items-center gap-1 cursor-pointer"><img src="/icons/favorite.svg" alt="Favorite" className="w-6 h-6" />ชอบ {likeCount}</a>
                            <a className="font-medium text-black flex flex-row items-center gap-1 cursor-default"><img src="/icons/share.svg" alt="Share" className="w-6 h-6" />แบ่งปัน</a>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0 justify-end">
                            {socialLinks.facebook && (
                                <a href={socialLinks.facebook} target="_blank" className="text-blue-600 hover:underline flex flex-row items-center gap-1">
                                    <img src="/icons/fb.svg" alt="Facebook" className="w-6 h-6" />
                                </a>
                            )}
                            {socialLinks.line && (
                                <a href={socialLinks.line} target="_blank" className="text-green-500 hover:underline">
                                    <img src="/icons/line.svg" alt="Line" className="w-6 h-6" />
                                </a>
                            )}
                            {socialLinks.twitter && (
                                <a href={socialLinks.twitter} target="_blank" className="text-sky-500 hover:underline">
                                    <img src="/icons/x.svg" alt="X - twitter" className="w-6 h-6" />
                                </a>
                            )}
                            {socialLinks.email && (
                                <a href={`mailto:${socialLinks.email}`} className="text-gray-500 hover:underline">
                                    <img src="/icons/email.svg" alt="Email" className="w-6 h-6" />
                                </a>
                            )}
                        </div>
                    </div> */}
                </div>
            {/* )} */}
        </div>
    );
}
