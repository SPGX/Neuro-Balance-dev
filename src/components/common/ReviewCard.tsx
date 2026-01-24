import { Star } from 'lucide-react';

interface ReviewCardProps {
    review: string;
    score: number;
    userName: string;
    reviewedDate: string;
    avatarUrl?: string;
}

export default function ReviewCard({
    review,
    score,
    userName,
    reviewedDate,
    avatarUrl,
}: ReviewCardProps) {
    return (
        <div className="relative bg-[#F5F5F7] rounded-[30px] p-6 pb-4 max-w-sm w-full shadow-sm">
            {/* Rating */}
            <div className="absolute top-4 right-4 flex items-center gap-1 text-gray-700">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">{score.toFixed(1)}</span>
            </div>

            {/* Quote mark */}
            <div className="text-[64px] text-[#D1D1D6] leading-none mb-4">“</div>

            {/* Review text */}
            <p className="text-blackText text-[16px] leading-6 font-normal mb-2 line-clamp-3">
                {review} ...
            </p>
            <a href="#" className="text-primary text-sm font-medium underline">
                ทั้งหมด
            </a>

            {/* User footer */}
            <div className="flex items-center gap-3 mt-6">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                    <img
                        src={avatarUrl}
                        alt="User avatar"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="text-left">
                    <p className="text-sm font-bold text-blackText">{userName}</p>
                    <p className="text-xs text-gray-500">
                        {new Date(reviewedDate).toLocaleDateString('th-TH', {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                        })}
                    </p>
                </div>
            </div>
        </div>
    );
}
