import { fetchBrainSymptomsPage } from './api';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

export interface Symptom {
    id: number;
    title: string;
    advisee: string;
    viewer: string;
    image: {
        formats?: {
            small?: { url: string };
            large?: { url: string };
        };
        url: string;
    };
}

export interface SymptomData {
    banner: {
        title: string;
        subTitle: string;
        image: string;
    };
    intro: {
        titleTh: string;
        titleEng: string;
        description: string;
    };
    symptoms: Symptom[];
}

export async function fetchSymptomData(): Promise<SymptomData> {
    const res = await fetchBrainSymptomsPage();
    const attrs = res.data;

    const bannerImg = attrs?.banner?.background?.formats?.large?.url ?? attrs?.banner?.background?.url ?? '';
    const introImage = attrs?.intro?.image?.url;

    return {
        banner: {
            title: attrs?.banner?.title ?? '',
            subTitle: attrs?.banner?.subTitle ?? '',
            image: bannerImg ? `${BASE_URL}${bannerImg}` : '',
        },
        intro: {
            titleTh: attrs?.intro?.titleTh ?? '',
            titleEng: attrs?.intro?.titleEng ?? '',
            description: attrs?.intro?.description ?? '',
        },
        symptoms: attrs?.symptoms?.contents ?? [],
    };
}
