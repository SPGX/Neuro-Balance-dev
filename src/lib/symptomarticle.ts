import { fetchSymptomArticles } from '../lib/api';

export interface ImageFormat {
    url: string;
    name: string;
    width: number;
    height: number;
    size: number;
    ext: string;
    mime: string;
}

export interface ImageData {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats?: {
        thumbnail?: ImageFormat;
        small?: ImageFormat;
        medium?: ImageFormat;
        large?: ImageFormat;
    } | null;
    url: string;
    ext: string;
    mime: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Banner {
    id: number;
    title: string;
    image?: ImageData | null;
}

export interface ViewCountAndSocial {
    id: number;
    viewed: number;
    line: string | null;
    facebook: string | null;
    twitter: string | null;
    email: string | null;
}

export interface SymptomArticle {
    id: number;
    documentId: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    banner?: Banner | null;
    viewCountAndSocial?: ViewCountAndSocial | null;
}

export interface SymptomArticlesData {
    articles: SymptomArticle[];
    total: number;
}

export async function fetchSymptomData(): Promise<SymptomArticlesData> {
    const res = await fetchSymptomArticles();
    return {
        articles: Array.isArray(res.data) ? res.data : [],
        total: res.meta?.pagination?.total ?? (Array.isArray(res.data) ? res.data.length : 0),
    };
}
