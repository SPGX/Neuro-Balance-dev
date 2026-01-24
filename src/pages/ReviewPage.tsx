import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReviewHeroGradient from "../components/common/reviews/ReviewHeroGradient";
import SectionHeading from "../components/common/reviews/SectionHeading";
import BubbleReviewCard, { BubbleItem } from "../components/common/reviews/BubbleReviewCard";
import VideoSwiper from "../components/common/reviews/VideoSwiper";
import AllReviewsSection, { ReviewItem } from "../components/common/reviews/AllReviewsSection";

type NBListItem = {
    review_id: string;
    rating?: number;
    source?: string;
    link?: string;
    author_name?: string;
    author_url?: string;
    author_thumbnail?: string;
    text?: string;
    date?: string;
    iso_date?: string;
};
type NBListResponse = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    lastFetchedAt?: string;
    items: NBListItem[];
};

const API_BASE = "https://kind-franklin.103-80-48-23.plesk.page/api/review";
const PAGE_SIZE = 12;

export default function ReviewPage() {
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingInit, setLoadingInit] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);

    const pageCache = useRef<Record<number, ReviewItem[]>>({});
    const totalPagesRef = useRef<number | null>(null);
    const inFlightAbort = useRef<AbortController | null>(null);

    const mapNBItem = useCallback((it: NBListItem): ReviewItem => {
        const nameRaw = (it.author_name ?? "").toString().trim();
        const name = nameRaw || "ผู้รีวิว";
        const initials = getInitials(name);
        const avatarRaw = (it.author_thumbnail ?? "").toString().trim();
        const avatar = avatarRaw || avatarDataUrlFromInitials(initials);
        const rawDate = (it.iso_date ?? it.date ?? "").toString().trim();
        const date = rawDate ? formatThaiDate(rawDate) : "";
        const rating = Number.isFinite(Number(it.rating)) ? Number(it.rating) : 0;
        const text = (it.text ?? "").toString().trim() || "(ไม่มีข้อความรีวิว)";
        return {
            id: it.review_id,
            review: text,
            fullReview: undefined,
            score: rating,
            userName: name,
            date,
            avatarUrl: avatar,
        };
    }, []);

    const sortByScoreDesc = useCallback((items: ReviewItem[]): ReviewItem[] => {
        return [...items].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    }, []);

    const fetchFromNB = useCallback(async (targetPage: number, signal?: AbortSignal): Promise<NBListResponse> => {
        const url = new URL(API_BASE);
        url.searchParams.set("limit", String(PAGE_SIZE));
        url.searchParams.set("page", String(targetPage));
        const res = await fetch(url.toString(), { headers: { Accept: "application/json" }, signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as NBListResponse;
    }, []);

    const loadPage = useCallback(
        async (p: number, signal?: AbortSignal) => {
            if (pageCache.current[p]) return;
            const json = await fetchFromNB(p, signal);
            const mapped = (json.items ?? []).map(mapNBItem);
            const sorted = sortByScoreDesc(mapped);
            pageCache.current[p] = sorted;
            setTotalCount(json.total ?? null);
            totalPagesRef.current = json.totalPages ?? null;
        },
        [fetchFromNB, mapNBItem, sortByScoreDesc]
    );

    const prefetchPage = useCallback(
        async (p: number) => {
            if (p <= 0) return;
            if (totalPagesRef.current && p > totalPagesRef.current) return;
            if (pageCache.current[p]) return;
            try {
                await loadPage(p);
            } catch { }
        },
        [loadPage]
    );

    useEffect(() => {
        (async () => {
            try {
                setError(null);
                setLoadingInit(true);
                await loadPage(1);
                await prefetchPage(2);
            } catch (e: any) {
                setError(e?.message ?? "Load failed");
            } finally {
                setLoadingInit(false);
            }
        })();
    }, [loadPage, prefetchPage]);

    const currentItems = pageCache.current[page] ?? [];

    const topThree: BubbleItem[] = useMemo(
        () =>
            (pageCache.current[1] ?? []).slice(0, 3).map((r, i) => ({
                id: typeof r.id === "number" ? r.id : i,
                review: r.review,
                score: r.score,
                userName: r.userName,
                date: r.date,
                avatarUrl: r.avatarUrl ?? "",
            })),
        [pageCache.current[1]]
    );

    const handlePageChange = async (nextPage: number) => {
        if (nextPage === page) return;
        setPage(nextPage);
        if (pageCache.current[nextPage]) {
            prefetchPage(nextPage + 1).catch(() => { });
            return;
        }
        try {
            setLoadingPage(true);
            setError(null);
            if (inFlightAbort.current) inFlightAbort.current.abort();
            const ac = new AbortController();
            inFlightAbort.current = ac;
            await loadPage(nextPage, ac.signal);
            prefetchPage(nextPage + 1).catch(() => { });
        } catch (e: any) {
            if (e?.name !== "AbortError") setError(e?.message ?? "Load failed");
        } finally {
            setLoadingPage(false);
            inFlightAbort.current = null;
        }
    };

    return (
        <div className="w-full">
            <ReviewHeroGradient />
            <SectionHeading eyebrow="ความประทับใจ" title="ของลูกค้ากับบริการของเรา" />
            <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-16">
                {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 px-4 py-3">{error}</div>}
                {loadingInit ? (
                    <div className="text-center text-gray-500">กำลังโหลดรีวิวหน้าแรก…</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {topThree.map((r) => (
                            <BubbleReviewCard key={r.id} item={r} />
                        ))}
                    </div>
                )}
            </section>
            <VideoSwiper
                videos={[
                    { id: 1, url: "https://www.youtube.com/watch?v=Tj0DUFPGuuw" },
                    { id: 2, url: "https://www.youtube.com/watch?v=la-SL7_hvVc" },
                    { id: 3, url: "https://www.youtube.com/watch?v=9GKbyh0XC58&t=2s" },
                    { id: 4, url: "https://www.youtube.com/watch?v=8PvmSzYz71M" },
                ]}
            />
            <AllReviewsSection
                reviews={currentItems}
                pageSize={12}
                mobilePageSize={12}
                totalCount={totalCount ?? undefined}
                page={page}
                onPageChange={handlePageChange}
                loadingPage={loadingPage}
            />
        </div>
    );
}

function getInitials(name: string) {
    const parts = name.trim().split(/\s+/).slice(0, 2);
    const letters = parts.map((p) => (p[0] ? p[0].toUpperCase() : "")).join("");
    return letters || "NB";
}

function avatarDataUrlFromInitials(initials: string) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><rect width='120' height='120' rx='60' fill='#e5e7eb'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' font-size='44' fill='#374151'>${initials}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function formatThaiDate(iso?: string, fallback?: string) {
    if (!iso && !fallback) return "";
    try {
        const str = (iso ?? fallback ?? "").toString().trim();
        const m = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (!m) return fallback ?? "";
        const be = parseInt(m[1], 10) + 543;
        const yy = be.toString().slice(-2);
        return `${m[3]}/${m[2]}/${yy}`;
    } catch {
        return fallback ?? "";
    }
}
