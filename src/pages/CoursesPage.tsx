import { useEffect, useState } from 'react';
import CoursesHero from '../components/sections/Courses/CoursesHero';
import TrainingCourseItem from '../components/common/TrainingCourseItem';
import LoadingScreen from '../components/common/LoadingScreen';
import { BannerInfoData, fetchCoursesPageData, type TrainingCourse } from '../lib/coursesapi';
import ContentBlock from '../components/common/ContentBlock';
import Breadcrumb from '../components/common/Breadcrumb';

export default function CoursesPage() {
    const [trainingCourses, setTrainingCourses] = useState<TrainingCourse[]>([]);
    const [bannerImage, setBannerImage] = useState<string>('');
    const [bannerInfo, setBannerInfo] = useState<BannerInfoData>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const load = async () => {
            try {
                const { bannerImage, courses, bannerInfo } = await fetchCoursesPageData();
                setBannerImage(bannerImage);
                setTrainingCourses(courses);
                setBannerInfo(bannerInfo);
            } catch (err) {
                console.error(err);
                setError('ไม่สามารถโหลดข้อมูลคอร์สได้');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    if (loading) return <LoadingScreen />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <section className="bg-gray-50 py-20">
            <div className="px-6 sm:px-11 mt-3 sm:mt-20">
                <ContentBlock
                    variant="hero"
                    title={bannerInfo?.titleEng || ''}
                    subtitleBelow={bannerInfo?.title || ''}
                    bgImage={bannerImage}
                    size="lg"
                    hideBgTitle
                    positionTitle="right"
                />
            </div>

            <div className="px-6 sm:px-11 mt-8">
                <Breadcrumb path={['คอร์สเทรนนิ่ง']} />
            </div>
            <div className="mx-auto px-6 lg:px-0 space-y-24">
                <div className="text-center mb-8">
                    <h3 className="text-title-32-black">ประเภทคอร์สเทรนนิ่ง</h3>
                    <p className="text-body-20-regular">
                        คอร์สมีทั้งหมด {trainingCourses.length} ประเภท
                    </p>
                </div>

                {trainingCourses.map((course) => (
                    <div key={course.id} className="flex justify-center">
                        <TrainingCourseItem course={course} />
                    </div>
                ))}
            </div>
        </section>
    );
}
