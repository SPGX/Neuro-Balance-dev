export const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

function joinUrl(base: string, path: string) {
    return `${base?.replace(/\/+$/, '')}/${path?.replace(/^\/+/, '')}`;
}

export async function getWithAuth<T = any>(
    path: string,
    errorMessage = 'โหลดข้อมูลไม่สำเร็จ'
): Promise<T> {
    const res = await fetch(joinUrl(BASE_URL, path), {
        headers: { Authorization: `Bearer ${TOKEN}` },
    });
    if (!res.ok) {
        console.error(`[API Error] ${res.status}: ${res.statusText}`);
        throw new Error(errorMessage);
    }
    return res.json();
}

export async function postWithAuth<TBody = any, TRes = any>(
    path: string,
    body: TBody,
    errorMessage = 'บันทึกข้อมูลไม่สำเร็จ'
): Promise<TRes> {
    const res = await fetch(joinUrl(BASE_URL, path), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    if (!res.ok) {
        console.error(`[API Error] ${res.status}: ${res.statusText}`);
        throw new Error(errorMessage);
    }
    return res.json();
}
