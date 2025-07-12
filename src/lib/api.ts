const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

export async function fetchContactUs() {
    const res = await fetch(`${BASE_URL}/contact-us?populate=*`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });

    if (!res.ok) throw new Error('Failed to fetch data');
    return res.json();
}

export async function fetchAboutData() {
    const res = await fetch(
        `${BASE_URL}/about-us?populate[banner][populate]=*&populate[about][populate]=*&populate[experience][populate]=*&populate[appPromo][populate]=*`,
        {
            headers: {
                Authorization: `Bearer ${TOKEN}`,
            },
        }
    );

    if (!res.ok) throw new Error('ไม่สามารถโหลดข้อมูล about-us ได้');
    return res.json();
}
