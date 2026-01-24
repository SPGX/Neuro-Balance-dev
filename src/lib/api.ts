export const BASE_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_API_TOKEN;

async function fetchWithAuth(path: string, errorMessage = 'โหลดข้อมูลไม่สำเร็จ') {
    const res = await fetch(`${BASE_URL}/${path}`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    });

    if (!res.ok) {
        console.error(`[API Error] ${res.status}: ${res.statusText}`);
        throw new Error(errorMessage);
    }

    return res.json();
}


export const fetchContactUs = () =>
    fetchWithAuth('contact-us?populate=*', 'ไม่สามารถโหลดข้อมูล Contact Us ได้');

export const fetchAboutData = () =>
    fetchWithAuth(
        'about-us?populate[banner][populate]=*&populate[about][populate]=*&populate[experience][populate]=*&populate[appPromo][populate][contents][populate]=*&populate[eng][populate][banner][populate]=*&populate[eng][populate][about][populate]=*&populate[eng][populate][experience][populate]=*&populate[eng][populate][appPromo][populate][contents][populate]=*',
        'ไม่สามารถโหลดข้อมูล About Us ได้'
    );

export const fetchTrainingCourses = () =>
    fetchWithAuth(
        'training-course?populate[banner][populate]=*&populate[courses][populate][number][populate]=*&populate[courses][populate][content][populate]=*',
        'ไม่สามารถโหลดข้อมูลคอร์สได้'
    );

export const fetchReviewData = () =>
    fetchWithAuth(
        'review?populate[banner][populate]=*&populate[review_section][populate]=*&populate[another_review_url_from_youtube][populate]=*',
        'ไม่สามารถโหลดข้อมูลรีวิวได้'
    );

export const fetchNeuroBalanceCourse = () =>
    fetchWithAuth(
        'neuro-balance-course?populate[banner][populate]=*&populate[intro][populate]=*&populate[process][populate][image][populate]=*&populate[process][populate][brainMapping][populate]=*&populate[process][populate][neurofeedback][populate][activities][populate]=*',
        'ไม่สามารถโหลดข้อมูล Neuro Balance Course ได้'
    );

export const fetchNeurologicalSymptom = () =>
    fetchWithAuth(
        'neurological-symptom?populate[banner][populate]=*&populate[intro][populate]=*',
        'ไม่สามารถโหลดข้อมูลหน้าอาการได้'
    );

export const fetchBioBalanceCourse = () =>
    fetchWithAuth(
        'bio-balance-course?populate[banner][populate]=*&populate[intro][populate]=*',
        'ไม่สามารถโหลดข้อมูล Bio Balance Course ได้'
    );

export const fetchBrainSymptomsPage = () =>
    fetchWithAuth(
        'neurological-symptom?populate[banner][populate]=*&populate[intro][populate]=*&populate[symptoms][populate][contents][populate][image][populate]=*',
        'ไม่สามารถโหลดข้อมูลหน้าอาการทางสมองได้'
    );

export const fetchArticleList = () =>
    fetchWithAuth(
        'articles?populate[banner][populate]=*&populate[viewCountAndSocial][populate]=*',
        'ไม่สามารถโหลดบทความได้'
    );

export const fetchArticleByDocumentId = (documentId: string) =>
    fetchWithAuth(
        `articles/${documentId}?populate[banner][populate]=*&populate[viewCountAndSocial][populate]=*`,
        'ไม่สามารถโหลดบทความได้'
    );

export const fetchSymptomArticles = () =>
    fetchWithAuth(
        'symtom-articles?populate[banner][populate]=*&populate[viewCountAndSocial][populate]=*',
        'ไม่สามารถโหลดข้อมูลอาการได้'
    );

export const fetchSymptomArticleByDocumentId = (documentId: string) =>
    fetchWithAuth(
        `symtom-articles/${documentId}?populate[article][populate]=*&populate[mediumContentCard][populate][additionImage][populate]=*&populate[mediumContentCard][populate][MarkDownWithRef][populate]=*&populate[mediumContentCard][populate][imageContent][populate]=*&populate[bigContentCard][populate]=*&populate[feedback][populate]=*&populate[banner][populate]=*&populate[viewCountAndSocial][populate]=*`,
        'ไม่สามารถโหลดบทความอาการได้'
    );