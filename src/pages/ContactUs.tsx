import React, { useEffect, useState } from 'react';
import { fetchContactUs } from '../lib/api';
import Button from '../components/common/Button';

interface ContactData {
    title: string;
    company_name: string;
    google_map_url: string;
    company_address?: string;
    filed_name: { field_name: string }[];
}

export default function ContactUs() {
    const [contact, setContact] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const json = await fetchContactUs();
                console.log('✅ API Response:', json);

                const data = json.data;
                let mapUrl = data.google_map_url;
                setContact({
                    title: data.title,
                    company_name: data.company_name,
                    company_address: data.company_address,
                    google_map_url: mapUrl,
                    filed_name: data.filed_name,
                });
            } catch (err) {
                console.error('❌ API Error:', err);
                setError('ไม่สามารถโหลดข้อมูลได้');
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <div className="text-center py-10">กำลังโหลด...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <section className="max-w-[1200px] mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* 🗺️ Map + Address */}
                <div className="bg-white rounded-[24px] shadow-md ">
                    <div className="w-full h-[450px] overflow-hidden mb-6">
                        <iframe
                            src={contact?.google_map_url}
                            className="w-full h-full border-0 rounded-t-[24px]"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="p-4">
                        <h2 className="text-title-main-bold mb-1">{contact?.company_name}</h2>
                        <p className="text-subtitle mb-4">
                            {contact?.company_address || '65/111 อาคารราชธานีเพ็ญชาติ บิสเนสเซ็นเตอร์ ชั้น 12, Rama IX Rd, Huai Khwang, Bangkok 10310'}
                        </p>
                        <a
                            href={contact?.google_map_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 font-medium bg-blue-50 px-3 py-2 rounded-full hover:bg-blue-100 transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2C6.686 2 4 4.686 4 8c0 4.58 6 10 6 10s6-5.42 6-10c0-3.314-2.686-6-6-6zm0 8a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                            Google Map
                        </a>
                    </div>
                </div>

                <div>
                    <div className="border-b-4 border-tealPrimary pb-3 mb-6">
                        <h3 className="text-heading-green mb-2">{contact?.company_name}</h3>
                        <h2 className="text-title-main mb-2">{contact?.title}</h2>
                        <p className="text-subtitle mb-2">ติดต่อเรา</p>
                    </div>
                    <form className="space-y-6 text-sm">
                        {contact?.filed_name.map((field, index) => (
                            <div key={index}>
                                <label className="block text-body-gray mb-1">
                                    {field.field_name}
                                    {(index === 0 || index === 1 || index === 4 || index === 5) && (
                                        <span className="text-red-500 ml-1">*</span>
                                    )}
                                </label>
                                {index === 5 ? (
                                    <textarea
                                        rows={4}
                                        placeholder="กรอกรายละเอียด"
                                        className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-blackText4D px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                        required
                                    />

                                ) : (
                                    <input
                                        type="text"
                                        placeholder="กรอกข้อมูล"
                                        className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-body-gray px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                        required={index === 0 || index === 1 || index === 4}
                                    />
                                )}
                            </div>
                        ))}

                        <div className="text-right pt-4">
                            <Button
                                color="gradient"
                                size="xl"
                                className="text-base font-semibold"
                            >
                                ส่งข้อความ
                            </Button>

                        </div>
                    </form>

                </div>
            </div>
        </section >

    );
}