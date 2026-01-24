import React from 'react';
import parse from 'html-react-parser';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeedbackSectionProps {
    content: string;
    linkToTest?: string;
}

export default function FeedbackSection({ content, linkToTest }: FeedbackSectionProps) {
    const isInternal = linkToTest?.startsWith('/');

    return (
        <section className="relative bg-[url(/bg_feedback_section.svg)] bg-cover py-16 px-4 md:px-10 overflow-hidden">
            <div className="relative z-10 max-w-[1440px] mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                    <span className="bg-gradient-to-r from-[#1D2126] via-[#0FC1A1] to-[#1680CE] bg-clip-text text-transparent font-bold">Neurofeedback กับ ASD</span>
                    {/* <span className="text-primary">feedback กับ ASD</span> */}
                </h2>

                <div className="prose max-w-none prose-p:text-blackText prose-p:text-lg prose-strong:font-semibold prose-strong:text-black mb-8">
                    {parse(content)}
                </div>

                {linkToTest && isInternal ? (
                    <Link
                        to={linkToTest}
                        className="relative inline-flex items-center gap-2 font-semibold px-6 py-2 rounded-full bg-white text-primary transition"
                    >
                        <span
                            className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[#106EE8] via-[#0FC1A1] to-[#CBFFCE]"
                            aria-hidden="true"
                        >
                            <span className="block w-full h-full rounded-full bg-white"></span>
                        </span>
                        <span className="relative flex items-center gap-2">
                            <FileText size={20} />
                            ทำแบบประเมินพฤติกรรม (ATEC)
                        </span>
                    </Link>
                ) : linkToTest && (
                    <a
                        href={linkToTest}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative inline-flex items-center gap-2 font-semibold px-6 py-2 rounded-full bg-white text-primary transition hover:bg-gray-100"
                    >
                        <span
                            className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-[#106EE8] via-[#0FC1A1] to-[#CBFFCE]"
                            aria-hidden="true"
                        >
                            <span className="block w-full h-full rounded-full bg-white"></span>
                        </span>
                        <span className="relative flex items-center gap-2">
                            <FileText size={20} />
                            ทำแบบประเมินพฤติกรรม (ATEC)
                        </span>
                    </a>
                )}
            </div>
        </section>
    );
}

