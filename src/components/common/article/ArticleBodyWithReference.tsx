import React from 'react';
import parse from 'html-react-parser';

interface ArticleBodyWithReferenceProps {
    content: string;
    reference?: string;
}

export default function ArticleBodyWithReference({
    content,
    reference,
}: ArticleBodyWithReferenceProps) {
    return (
        <div className="prose prose-p:text-blackText prose-p:text-lg mb-10 h-auto max-w-[1440px] mx-auto">
            {parse(content)}

            {reference && (
                <div className="mt-8 bg-[#F5F9FF] text-[#106EE8] text-[16px] p-6 rounded-xl leading-relaxed">
                    {reference}
                </div>
            )}
        </div>
    );
}
