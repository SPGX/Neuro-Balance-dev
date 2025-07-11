import CoursesHero from '../components/sections/Courses/CoursesHero'
import TrainingCourseItem from '../components/common/TrainingCourseItem'

export default function CoursesPage() {
    const trainingCourses = [
        {
            id: 'neuro-balance',
            order: 1,
            title: 'Neuro Balance',
            subtitle: 'ปรับปรุงความสมดุลให้แก่สมอง',
            description: `สมองที่มีความสมดุลนั้นก่อให้เกิดประโยชน์มากมาย โดยรวมคือการทำให้มีสุขภาพที่ดี การดูแลสุขภาพรักษากายและใจให้พร้อมสำหรับการดำเนินชีวิตใหม่ๆในแต่ละวัน ซึ่งไม่ได้ถือว่าเป็นเรื่องยาก หากแต่รู้จักการจัดระบบสมองให้มีความสมดุล`,
            image: '/images/trainings/neuro.png',
        },
        {
            id: 'bio-balance',
            order: 2,
            title: 'Bio Balance',
            subtitle: 'ปรับปรุงความสมดุลให้แก่สมอง',
            description: `สมองที่มีความสมดุลนั้นก่อให้เกิดประโยชน์มากมาย โดยรวมคือการทำให้มีสุขภาพที่ดี การดูแลสุขภาพรักษากายและใจให้พร้อมสำหรับการดำเนินชีวิตใหม่ๆในแต่ละวัน ซึ่งไม่ได้ถือว่าเป็นเรื่องยาก หากแต่รู้จักการจัดระบบสมองให้มีความสมดุล`,
            image: '/images/trainings/bio.png',
            reverse: true,
        },
    ]

    return (
        <>
            <CoursesHero />
            <section className="bg-gray-50 py-20">
                <div className="mx-auto px-6 lg:px-0 space-y-24">
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-bold">ประเภทคอร์สเทรนนิ่ง</h3>
                        <p className="text-gray-500">
                            คอร์สมีทั้งหมด {trainingCourses.length} ประเภท
                        </p>
                    </div>
                    {trainingCourses.map((c) => (
                        <TrainingCourseItem key={c.id} course={c} />
                    ))}
                </div>
            </section>
        </>
    )
}
