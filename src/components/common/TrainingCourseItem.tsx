import { Link } from "react-router-dom";

type TrainingCourse = {
    id: string;
    slug: string;
    order: number;
    title: string;
    subtitle?: string;
    description: string;
    image: string;
    reverse?: boolean;
};

export default function TrainingCourseItem({
    course,
}: {
    course: TrainingCourse;
}) {
    const { id, order, title, subtitle, description, image, reverse } = course;

    return (
        <div
            className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} items-stretch gap-8 md:gap-0`}
        >
            {/* content */}
            <div className={`w-full md:w-[40%] flex flex-col justify-center px-6 md:px-12 order-1 ${reverse ? "items-end text-right mr-[clamp(0px,calc((100vw-1440px)*0.45),500px)]" : "items-start text-left ml-[clamp(0px,calc((100vw-1440px)*0.45),500px)]"}`}>
                <span className="text-[88px] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#CBFFCE] via-[#0FC1A1] to-[#0FC1A100]">
                {order}
                </span>
                <h6 className="-mt-3 text-title-20-teal">คอร์สเทรนนิ่ง</h6>
                <h3 className="text-title-32-black mt-2 mb-4">{subtitle}</h3>
                <div className="text-body-20-regular whitespace-pre-line mb-6">{description}</div>
                <Link
                    to={`/courses/${course.slug}`}
                    className="w-max px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                    รายละเอียด
                </Link>
            </div>

            {/* image */}
            <div
                className={`relative w-full md:w-[60%] h-[360px] md:h-[586px] overflow-hidden shadow-2xl rounded-3xl md:rounded-none ${reverse ? "md:rounded-r-3xl" : "md:rounded-l-3xl"} order-2`}
            >
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-900/30 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                    <h4 className="text-title-40-white">{subtitle}</h4>
                    {subtitle && <p className="text-subheading-20-white">{title}</p>}
                </div>
            </div>
        </div>
    );
}
