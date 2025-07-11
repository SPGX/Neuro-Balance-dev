import { Link } from "react-router-dom";

type TrainingCourse = {
    id: string;
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
            className={`
        flex flex-col md:flex-row
        ${reverse ? "md:flex-row-reverse" : ""}
        items-stretch gap-8 md:gap-0
      `}
        >
            <div className="w-full md:w-[40%] flex flex-col justify-center px-6 md:px-12">
                <span className="text-[88px] leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-[#39FFC6] to-[#0FB2A6]">
                    {order}
                </span>
                <h6 className="-mt-5 text-teal-600 font-semibold">คอร์สเทรนนิ่ง</h6>
                <h3 className="text-2xl font-bold mt-2 mb-4">{title}</h3>
                <p className="text-gray-600 whitespace-pre-line mb-6">{description}</p>
                <Link
                    to={`/courses/${id}`}
                    className="w-max px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md hover:opacity-90 transition"
                >
                    รายละเอียด
                </Link>
            </div>

            <div
                className={`
          relative w-full md:w-[60%]
          h-[300px] md:h-[500px]
          overflow-hidden shadow-2xl
          rounded-3xl md:rounded-none
          ${reverse ? "md:rounded-r-3xl" : "md:rounded-l-3xl"}
        `}
            >
                <img src={image} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-900/30 to-transparent" />
                <div className="absolute bottom-4 left-6 text-white">
                    <h4 className="text-xl font-bold">{title}</h4>
                    {subtitle && <p className="text-sm opacity-90">{subtitle}</p>}
                </div>
            </div>
        </div>
    );
}
