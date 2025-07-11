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
