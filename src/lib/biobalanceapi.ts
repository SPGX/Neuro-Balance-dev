import { fetchBioBalanceCourse } from './api';

const BASE_URL = import.meta.env.VITE_API_URL.replace('/api', '');

function getImageUrl(img: any): string {
    return img?.formats?.large?.url
        ? BASE_URL + img.formats.large.url
        : img?.formats?.medium?.url
            ? BASE_URL + img.formats.medium.url
            : img?.url
                ? BASE_URL + img.url
                : '';
}

export interface BioBalanceData {
    banner: {
        titleTh: string;
        titleEng: string;
        image: string;
    };
    intro: {
        title: string;
        icon: string;
        description: string;
    };
    overview: {
        description: string;
        image: string;
    };
    foreword: string;
}

export async function fetchBioBalanceData(): Promise<BioBalanceData> {
    const res = await fetchBioBalanceCourse();
    const attrs = res.data;

    return {
        banner: {
            titleTh: attrs?.banner?.titleTh ?? '',
            titleEng: attrs?.banner?.titleEng ?? '',
            image: getImageUrl(attrs?.banner?.background),
        },
        intro: {
            title: attrs?.intro?.title ?? '',
            icon: getImageUrl(attrs?.intro?.image),
            description: attrs?.intro?.description ?? '',
        },
        overview: {
            description: attrs?.intro?.secondDescription ?? '',
            image: getImageUrl(attrs?.intro?.secondImage),
        },
        foreword: attrs?.foreword ?? '',
    };
}
