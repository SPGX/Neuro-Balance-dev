import { useEffect, useMemo, useState } from "react";
import { fetchContactData, ContactData } from "../lib/contactapi";
import { createAppointment } from "../lib/appointments";
import LoadingScreen from "../components/common/LoadingScreen";
import Swal from "sweetalert2";

function toPlaceCidLink(rawUrl?: string | null): string | undefined {
    if (!rawUrl) return undefined;
    try {
        const u = new URL(rawUrl);
        const cidParam = u.searchParams.get("cid");
        if (cidParam) return `https://www.google.com/maps?cid=${cidParam}`;
    } catch { }
    const decoded = decodeURIComponent(rawUrl);
    const m = decoded.match(/0x[0-9a-fA-F]+:0x([0-9a-fA-F]+)/);
    if (!m) return undefined;
    const cid = BigInt("0x" + m[1]).toString(10);
    return `https://www.google.com/maps?cid=${cid}`;
}

function toISOFromYMD(ymd: string): string | null {
    if (!ymd) return null;
    const [y, m, d] = ymd.split("-").map((v) => parseInt(v, 10));
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d, 9, 0, 0, 0);
    return dt.toISOString();
}

function normalizeLabel(raw: string | undefined) {
    const text = (raw ?? "").trim();
    const clean = text.replace(/\s*\*+(\s*\*+)*/g, "").trim();
    return clean;
}

export default function ContactUs() {
    const [contact, setContact] = useState<ContactData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [lineId, setLineId] = useState("");
    const [bestTimeRaw, setBestTimeRaw] = useState("");
    const [bestTimeFocused, setBestTimeFocused] = useState(false);
    const [message, setMessage] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const mapUrl = toPlaceCidLink(contact?.google_map_url);

    const bestTimeDisplay = useMemo(() => {
        if (!bestTimeRaw) return "";
        const [y, m, d] = bestTimeRaw.split("-");
        return `${d}/${m}/${y}`;
    }, [bestTimeRaw]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchContactData();
                setContact(data);
            } catch {
                setError("ไม่สามารถโหลดข้อมูลได้");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name || !phone || !email || !lineId || !bestTimeRaw) {
            Swal.fire({ icon: "error", title: "กรอกข้อมูลไม่ครบ", text: "กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน" });
            return;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk) {
            Swal.fire({ icon: "error", title: "อีเมลไม่ถูกต้อง", text: "กรุณาตรวจสอบรูปแบบอีเมล" });
            return;
        }
        const phoneOk = /^[0-9\-+]{9,12}$/.test(phone);
        if (!phoneOk) {
            Swal.fire({ icon: "error", title: "เบอร์โทรไม่ถูกต้อง", text: "กรุณากรอกเฉพาะตัวเลข 9–12 หลัก" });
            return;
        }
        const iso = toISOFromYMD(bestTimeRaw);
        if (!iso) {
            Swal.fire({ icon: "error", title: "วันที่ไม่ถูกต้อง", text: "กรุณาเลือกวันที่ใหม่อีกครั้ง" });
            return;
        }

        try {
            setSubmitting(true);
            await createAppointment({
                name: name.trim(),
                lineID: lineId.trim(),
                email: email.trim(),
                symtom: "",
                phoneNumber: phone.trim(),
                moreInfo: message.trim(),
                time: iso,
            });
            Swal.fire({
                icon: "success",
                title: "สำเร็จ",
                text: "ส่งอีเมลยืนยันการนัดหมายเรียบร้อยแล้ว",
                timer: 2000,
                showConfirmButton: false,
            });
            setName("");
            setPhone("");
            setEmail("");
            setLineId("");
            setBestTimeRaw("");
            setMessage("");
        } catch {
            Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่" });
        } finally {
            setSubmitting(false);
        }
    }

    if (loading) return <LoadingScreen />;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

    return (
        <section className="max-w-[1200px] mx-auto px-4 py-3 sm:py-16 mt-20 sm:mt-10">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div className="bg-white rounded-[24px] shadow-md">
                    <div className="w-full h-[450px] overflow-hidden mb-6">
                        <iframe
                            src={contact?.google_map_url || ""}
                            className="w-full h-full border-0 rounded-t-[24px]"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="p-4">
                        <h2 className="text-title-32-black mb-1">{contact?.company_name}</h2>
                        <p className="text-size-16 font-medium text-[#222225B2] mb-4">
                            {contact?.company_address ||
                                "65/111 อาคารราชธานีเพ็ญชาติ บิสเนสเซ็นเตอร์ ชั้น 12, Rama IX Rd, Huai Khwang, Bangkok 10310"}
                        </p>
                        {mapUrl && (
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-lg text-lightBlue font-bold bg-blue-50 px-5 py-3 rounded-full hover:bg-blue-100 transition"
                            >
                                Google Map
                                <img src="/icons/SquareTopDown.png" className="w-5 h-5 ml-[10px]" alt="" />
                            </a>
                        )}
                    </div>
                </div>

                <div>
                    <div className="border-b-4 border-tealPrimary pb-3 mb-6">
                        <h3 className="text-heading-16 mb-2 text-tealPrimary">{contact?.company_name}</h3>
                        <h2 className="text-title-main mb-2">{contact?.title}</h2>
                        <p className="text-subtitle mb-2">ติดต่อเรา</p>
                    </div>

                    <form className="space-y-6 text-sm" onSubmit={handleSubmit}>
                        {Array.isArray(contact?.filedName) &&
                            contact.filedName.map((field, index) => {
                                const labelText = normalizeLabel(field.fieldName);

                                if (index === 0)
                                    return (
                                        <div key={index}>
                                            <label className="block text-body-gray mb-1">
                                                {labelText} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="กรอกข้อมูล"
                                                className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-body-gray px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    );

                                if (index === 1)
                                    return (
                                        <div key={index}>
                                            <label className="block text-body-gray mb-1">
                                                {labelText} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="กรอกข้อมูล"
                                                className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-body-gray px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                    );

                                if (index === 2)
                                    return (
                                        <div key={index}>
                                            <label className="block text-body-gray mb-1">
                                                {labelText} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                placeholder="กรอกข้อมูล"
                                                className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-body-gray px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                    );

                                if (index === 3)
                                    return (
                                        <div key={index}>
                                            <label className="block text-body-gray mb-1">
                                                {labelText} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="กรอกข้อมูล"
                                                className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-body-gray px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                                value={lineId}
                                                onChange={(e) => setLineId(e.target.value)}
                                                required
                                            />
                                        </div>
                                    );

                                if (index === 4)
                                    return (
                                        <div key={index}>
                                            <label className="block text-body-gray mb-1">
                                                {labelText} <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type={bestTimeFocused ? "date" : "text"}
                                                value={bestTimeFocused ? bestTimeRaw : bestTimeDisplay}
                                                onFocus={() => setBestTimeFocused(true)}
                                                onBlur={() => setBestTimeFocused(false)}
                                                onChange={(e) => setBestTimeRaw(e.target.value)}
                                                placeholder="กรอกข้อมูล"
                                                className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-body-gray px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                                required
                                            />
                                        </div>
                                    );

                                if (index === 5)
                                    return (
                                        <div key={index}>
                                            <label className="block text-body-gray mb-1">{labelText}</label>
                                            <textarea
                                                rows={4}
                                                placeholder="กรอกรายละเอียด"
                                                className="w-full border-b border-gray-300 bg-white placeholder-noto-gray text-blackText4D px-0 py-2 focus:outline-none focus:ring-0 focus:border-blackText"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                        </div>
                                    );

                                return null;
                            })}

                        <div className="text-right pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-gradient-to-l from-[#00AAFF] to-[#106EE8] text-white font-semibold hover:opacity-90 disabled:opacity-60"
                            >
                                {submitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
