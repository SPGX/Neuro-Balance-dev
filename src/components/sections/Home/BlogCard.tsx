export default function BlogCard({ image, tag, title, date, views, href }) {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow transition flex flex-col overflow-hidden min-h-[370px] border border-gray-100">
            <img src={image} alt={title} className="w-full h-[180px] object-cover rounded-t-2xl" />
            <div className="p-5 flex flex-col flex-1">
                <span className="text-[#16c79a] text-[15px] font-semibold mb-1">{tag}</span>
                <div className="font-bold text-base text-gray-900 mb-2 leading-snug line-clamp-2">{title}</div>
                <div className="flex items-center justify-between mt-auto">
                    <div className="text-gray-400 text-xs flex items-center gap-2">
                        <span>{date}</span>
                        <span className="flex items-center gap-1">
                            <img
                                src="/icons/visibility.svg"
                                alt="จำนวนผู้อ่าน"
                                className="w-4 h-4"
                                style={{ display: "inline-block" }}
                            />
                            {views.toLocaleString()}
                        </span>
                    </div>
                    <a
                        href={href}
                        className="w-9 h-9 flex items-center justify-center rounded-full text-white font-bold shadow-lg bg-hero-th-gradient hover:opacity-90 transition"
                        aria-label="อ่านเพิ่มเติม"
                    >
                        <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
