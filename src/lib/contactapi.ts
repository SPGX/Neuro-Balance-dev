import { fetchContactUs } from './api';

export interface ContactField {
    fieldName: string;
}

export interface ContactData {
    title: string;
    company_name: string;
    google_map_url: string;
    company_address?: string;
    filedName: ContactField[];
}

export async function fetchContactData(): Promise<ContactData> {
    const res = await fetchContactUs();
    const data = res.data;

    return {
        title: 'ติดต่อเรา',
        company_name: 'Neuro Balance',
        company_address: '',
        google_map_url: data.googleMapUrl ?? '',
        filedName: data.filedName ?? [],
    };
}
