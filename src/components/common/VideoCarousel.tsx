import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';

type VideoItem = {
    id: string | number;
    youtubeUrl: string;
};

type Props = {
    videos: VideoItem[];
};

export default function VideoCarousel({ videos }: Props) {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef<any>(null);

    return (
        <div className="flex items-center justify-center gap-4 px-4">
            {/* Left Arrow */}
            <button
                className={`prev-button p-2 rounded-full shadow transition ${isBeginning ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
                    }`}
                disabled={isBeginning}
            >
                <ArrowLeft className={`w-5 h-5 ${isBeginning ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>

            {/* Swiper */}
            <div className="w-full max-w-6xl">
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    onSlideChange={(swiper) => {
                        setIsBeginning(swiper.isBeginning);
                        setIsEnd(swiper.isEnd);
                    }}
                    navigation={{
                        nextEl: '.next-button',
                        prevEl: '.prev-button',
                    }}
                    spaceBetween={20}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {videos.map((video) => (
                        <SwiperSlide key={video.id}>
                            <div className="bg-white rounded-xl overflow-hidden shadow border border-gray-200">
                                <iframe
                                    className="w-full aspect-video"
                                    src={video.youtubeUrl}
                                    allowFullScreen
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Right Arrow */}
            <button
                className={`next-button p-2 rounded-full shadow transition ${isEnd ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'
                    }`}
                disabled={isEnd}
            >
                <ArrowRight className={`w-5 h-5 ${isEnd ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>
        </div>
    );
}
