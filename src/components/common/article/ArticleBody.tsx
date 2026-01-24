import React from 'react';

type Props = {
    html?: string | null;
    className?: string;
};

export default function ArticleBody({ html, className = '' }: Props) {
    if (!html) return null;
    return (
        <section className={`mx-auto pb-10 ${className}`}>
            <div
                className="
          prose prose-lg max-w-none
          prose-headings:font-semibold
          prose-a:text-sky-600 hover:prose-a:underline
          prose-img:rounded-xl
          prose-p:leading-relaxed
        "
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </section>
    );
}
