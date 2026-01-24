// src/lib/serpapi.ts
export type SerpReview = {
    rating: number;
    iso_date?: string;
    date?: string;
    link: string;
    review_id?: string;
    user?: { name?: string; thumbnail?: string };
    snippet?: string;
    extracted_snippet?: { original?: string };
};

export type SerpResponse = {
    place_info?: { title?: string; rating?: number; reviews?: number };
    reviews: SerpReview[];
    serpapi_pagination?: { next_page_token?: string; next?: string };
};

const API_BASE = "/serpapi/search.json";
const ENGINE = "google_maps_reviews";
const HL = 'en';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function get(url: string): Promise<SerpResponse> {
    const res = await fetch(url);
    if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`SerpAPI ${res.status} ${t}`);
    }
    return (await res.json()) as SerpResponse;
}

function buildUrl(apiKey: string, placeId: string, nextToken?: string) {
    const params = new URLSearchParams();
    params.set('engine', ENGINE);
    params.set('api_key', apiKey);
    params.set('place_id', placeId);
    params.set('hl', HL);
    if (nextToken) params.set('next_page_token', nextToken);
    return `${API_BASE}?${params.toString()}`;
}

export async function fetchGoogleMapsReviews(opts: {
    apiKey: string;
    placeId: string;
    nextPageToken?: string;
    nextUrl?: string;
}): Promise<SerpResponse> {
    const { apiKey, placeId, nextPageToken, nextUrl } = opts;
    if (nextUrl) {
        const proxied = nextUrl.replace('https://serpapi.com', '/serpapi');
        return get(proxied);
    }
    return get(buildUrl(apiKey, placeId, nextPageToken));
}

export async function fetchAllGoogleMapsReviews(opts: {
    apiKey: string;
    placeId: string;
    maxPages?: number;
}): Promise<SerpResponse> {
    const { apiKey, placeId, maxPages = 10 } = opts;

    const first = await fetchGoogleMapsReviews({ apiKey, placeId });
    const all = [...(first.reviews ?? [])];

    let nextToken = first.serpapi_pagination?.next_page_token;
    let nextUrl = first.serpapi_pagination?.next;
    const seen = new Set<string>();
    if (nextToken) seen.add(nextToken);

    for (let i = 2; i <= maxPages; i++) {
        if (!nextToken && !nextUrl) break;
        await sleep(2100);

        const page = await fetchGoogleMapsReviews({
            apiKey,
            placeId,
            nextPageToken: nextToken,
            nextUrl,
        });

        all.push(...(page.reviews ?? []));

        const newToken = page.serpapi_pagination?.next_page_token;
        const newUrl = page.serpapi_pagination?.next;

        if (newToken && seen.has(newToken)) break;
        if (newToken) seen.add(newToken);

        nextToken = newToken;
        nextUrl = newUrl;
    }

    return { ...first, reviews: all, serpapi_pagination: undefined };
}

export const toThaiShort = (iso?: string, fallback?: string) => {
    if (!iso && !fallback) return '';
    const src = iso ?? fallback!;
    const d = /^\d{4}-\d{2}-\d{2}$/.test(src) ? new Date(`${src}T00:00:00Z`) : new Date(src);
    try {
        return d.toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: '2-digit' });
    } catch {
        return fallback ?? '';
    }
};

export const pickText = (r: SerpReview) =>
    (r.extracted_snippet?.original ?? '').trim() || (r.snippet ?? '').trim() || '';
