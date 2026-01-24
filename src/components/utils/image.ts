const BASE = (import.meta.env.VITE_API_URL as string).replace(/\/api\/?$/, '');

export function toAbs(u?: string | null) {
    if (!u) return '';
    return u.startsWith('http') ? u : `${BASE}${u}`;
}

export function getImageUrl(
    img?: any,
    pref: 'large' | 'medium' | 'small' | 'raw' = 'large'
) {
    if (!img) return '/default-image.svg';
    const f = img.formats ?? {};
    const pick =
        (pref === 'large' && f.large?.url) ||
        (pref === 'medium' && f.medium?.url) ||
        (pref === 'small' && f.small?.url) ||
        f.large?.url ||
        f.medium?.url ||
        f.small?.url ||
        img.url;
    return toAbs(pick) || '/default-image.svg';
}

export function formatThaiShort(iso?: string) {
    if (!iso) return '';
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yy = String(d.getFullYear() + 543).slice(-2);
    return `${dd}/${mm}/${yy}`;
}
