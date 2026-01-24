import { fetchAboutData } from './api'
import parse from 'html-react-parser'

function getImageUrl(imageSource: any, size: 'large' | 'medium' = 'large'): string {
    const baseApiUrl = import.meta.env.VITE_API_URL
    const baseUrl = baseApiUrl.replace('/api', '')
    const img = Array.isArray(imageSource) ? imageSource[0] : imageSource
    const url = img?.formats?.[size]?.url ?? img?.url ?? ''
    return url ? baseUrl + url : '/images/placeholder.png'
}

export interface AboutData {
    banners: { title: string; description: string; image: string }[];
    about: { title: string; description: string; image: string };
    experience: {
        title: string; subTitle: string; description: string; image: string;
        stats: { label: string; value: string }[]; partners: string[];
    };
    promos: { image: string; title: string; description: string; id: string }[];
    promoTitleTh?: string;
    promoTitleEng?: string;
}

export async function fetchAboutPageData(lang: 'th' | 'en' = 'th'): Promise<AboutData> {
    const json = await fetchAboutData()
    const root = json.data
    const data = (lang === 'en' && root.eng) ? root.eng : root

    const rawBanners = Array.isArray(data.banner) ? data.banner : [data.banner]
    const banners = rawBanners.map((b: any) => ({
        title: b?.title ?? '',
        description: b?.subTitle ?? b?.description ?? '',
        image: getImageUrl(b?.image),
    }))

    const about = {
        title: data.about?.titleTh ?? data.about?.titleEng ?? '',
        description: (parse(data.about?.description ?? '') as unknown as string) ?? '',
        image: getImageUrl(data.about?.image),
    }

    const experience = {
        title: data.experience?.titleTh ?? '',
        subTitle: data.experience?.titleEng ?? '',
        description: (parse(data.experience?.description ?? '') as unknown as string) ?? '',
        image: getImageUrl(data.experience?.image),
        stats: (data.experience?.cases || []).map((c: any) => ({
            label: c.case,
            value: (c.number ?? 0).toLocaleString(),
        })),
        partners: data.experience?.partner?.images?.map((img: any) => getImageUrl(img)) ?? [],
    }

    const promos = (data.appPromo?.contents || []).map((p: any) => ({
        title: p.title,
        description: (parse(p.description ?? '') as unknown as string) ?? '',
        image: getImageUrl(p.image),
    }))

    const promoTitleTh = data.appPromo?.titleTh ?? ''
    const promoTitleEng = data.appPromo?.titleEng ?? ''

    return { banners, about, experience, promos, promoTitleTh, promoTitleEng }
}
