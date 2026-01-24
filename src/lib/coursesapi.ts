import { fetchTrainingCourses } from './api';
import parse from 'html-react-parser';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export interface TrainingCourse {
    id: string;
    slug: string;
    order: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    reverse: boolean;
}

export interface CoursesPageData {
    bannerImage: string;
    courses: TrainingCourse[];
    bannerInfo?: BannerInfoData;
}

export interface BannerInfoData {
    title: string;
    titleEng: string;
}

export async function fetchCoursesPageData(): Promise<CoursesPageData> {
    const json = await fetchTrainingCourses();
    const data = json.data;

    const imageUrl =
        data.banner?.background?.formats?.large?.url ||
        data.banner?.background?.formats?.medium?.url ||
        data.banner?.background?.formats?.small?.url ||
        data.banner?.background?.url ||
        '';
    const bannerImage = BASE_URL + imageUrl;

    const bannerInfo: BannerInfoData = {
        title: data.banner?.title || '',
        titleEng: data.banner?.titleEng || '',
    }

    const courses = (data.courses || []).map((course: any, i: number) => ({
        id: course.id,
        slug: course.titleEng.toLowerCase().replace(/\s+/g, '-'),
        order: i + 1,
        title: course.content?.titleTh ?? '',
        subtitle: course.content?.titleEng ?? '',
        description: parse(course.description ?? '') as string,
        image: BASE_URL + (course.content?.image?.url || ''),
        reverse: i % 2 !== 0,
    }));

    return { bannerImage, courses, bannerInfo };
}
