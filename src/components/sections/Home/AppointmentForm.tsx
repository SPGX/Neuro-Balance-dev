import { ChevronDown } from "lucide-react";
import React, { useMemo, useState } from "react";
import Swal from "sweetalert2";
import { createAppointment } from "../../../lib/appointments";

type FormState = {
  name: string;
  email: string;
  phoneNumber: string;
  lineID: string;
  symptom: string;
  moreInfo: string;
  dateRaw: string;
};

export default function AppointmentSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phoneNumber: "",
    lineID: "",
    symptom: "",
    moreInfo: "",
    dateRaw: "",
  });
  const [focusedDate, setFocusedDate] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; } | null>(null);

  const dateDisplay = useMemo(() => {
    if (!form.dateRaw) return "";
    const [y, m, d] = form.dateRaw.split("-");
    return `${d}/${m}/${y}`;
  }, [form.dateRaw]);

  const todayYMD = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const setField =
    (key: keyof FormState) =>
      (val: string) =>
        setForm((prev) => ({ ...prev, [key]: val }));

  function toISOFromYMD(ymd: string): string | null {
    if (!ymd) return null;
    const [y, m, d] = ymd.split("-").map((v) => parseInt(v, 10));
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d, 9, 0, 0, 0);
    return dt.toISOString();
  }

  const isFormValid =
    form.name.trim() &&
    form.email.trim() &&
    form.phoneNumber.trim() &&
    form.lineID.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!form.name || !form.email || !form.phoneNumber || !form.lineID || !form.symptom || !form.dateRaw) {
      setMessage({ type: "error", text: "กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน" });
      Swal.fire({ icon: "error", title: "กรอกข้อมูลไม่ครบ", text: "กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน" });
      return;
    }

    const iso = toISOFromYMD(form.dateRaw);
    if (!iso) {
      setMessage({ type: "error", text: "รูปแบบวันที่ไม่ถูกต้อง" });
      Swal.fire({ icon: "error", title: "วันที่ไม่ถูกต้อง", text: "กรุณาเลือกวันที่ใหม่อีกครั้ง" });
      return;
    }

    const payload = {
      name: form.name.trim(),
      lineID: form.lineID.trim(),
      email: form.email.trim(),
      symtom: form.symptom, // ตามสเปกปัจจุบัน
      phoneNumber: form.phoneNumber.trim(),
      moreInfo: form.moreInfo.trim(),
      time: iso,
    };

    try {
      setSubmitting(true);
      await createAppointment(payload);
      setMessage({ type: "success", text: "บันทึกข้อมูลเรียบร้อยแล้ว" });
      Swal.fire({
        icon: "success",
        title: "สำเร็จ",
        text: "ส่งอีเมลยืนยันการนัดหมายเรียบร้อยแล้ว",
        timer: 1800,
        showConfirmButton: false,
      });
      setForm({ name: "", email: "", phoneNumber: "", lineID: "", symptom: "", moreInfo: "", dateRaw: "" });
    } catch {
      setMessage({ type: "error", text: "ไม่สามารถบันทึกข้อมูลได้" });
      Swal.fire({ icon: "error", title: "เกิดข้อผิดพลาด", text: "ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="appointment" className="bg-[#F3FCFA] py-8 px-2 sm:px-4 md:px-8 overflow-x-hidden">
      <div
        className="
          max-w-7xl mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-0 items-stretch
          rounded-[28px] shadow-none
        "
      >
        {/* LEFT PANEL */}
        <div
          className="
            flex flex-col justify-between h-full
            px-6 sm:px-10 pt-10 sm:pt-16 pb-8
            rounded-t-[28px] lg:rounded-l-[28px] lg:rounded-tr-none
          "
        >
          <div>
            <h2 className="text-2xl sm:text-5xl font-medium mb-3 text-gray-900 leading-snug">
              ขั้นตอนการเข้า<br />ใช้บริการ
            </h2>
            <p className="text-gray-600 mb-3 text-base">
              ขั้นตอนการให้บริการของ <span className="font-semibold text-gray-900">Neuro Balance</span>
              <br />
              สำหรับลูกค้าที่ติดต่อผ่านบริษัทโดยตรง
              <br />
              <span className="font-semibold text-[#16c79a]">โทร 02-245-4227</span>
            </p>
            <div className="flex items-center gap-2 mb-8">
              <span className="bg-[#39CD00] text-white px-3 py-1 rounded-full text-sm font-semibold">
                LINE @neurobalance
              </span>
            </div>
            <ol className="relative space-y-7">
              {[
                // { step: 1, title: "Define Your Success", desc: "นัดหมายพูดคุยกับทีมของเราเพื่อกำความรู้จักธุรกิจของคุณเพื่อกำหนดเป้าหมาย" },
                // { step: 2, title: "Audit & Create Master Plan", desc: "ตรวจสอบและวิเคราะห์ข้อมูลทางการตลาดเพื่อกำหนดกลยุทธ์และแผนงานการตลาดที่เหมาะสม" },
                // { step: 3, title: "Execute, Tracking", desc: "ดำเนินการแคมเปญ ติดตามผล และปรับปรุงแคมเปญอย่างต่อเนื่อง เพื่อให้แน่ใจว่าแคมเปญมีประสิทธิภาพ" },
                { step: 1, title: "ติดต่อเพื่อขอข้อมูลและนัดหมาย", desc: "โทรศัพท์ / LINE / เว็บไซต์ของศูนย์ เพื่อสอบถามรายละเอียดบริการ ราคา และเลือกวันเวลาที่สะดวก" },
                { step: 2, title: "เข้ารับการประเมินเบื้องต้น", desc: "เมื่อไปถึงศูนย์ เจ้าหน้าที่จะซักประวัติ อธิบายโปรแกรม และประเมินอาการหรือความต้องการ เพื่อวางแผนบริการที่เหมาะสม" },
                { step: 3, title: "เริ่มรับบริการและติดตามผล", desc: "เข้ารับโปรแกรม Neuro Balance ตามแผนที่กำหนด พร้อมมีการติดตามผลและปรับโปรแกรมตามความเหมาะสม" },
              ].map((s, i) => (
                <li key={s.step} className="flex items-start relative">
                  {i !== 2 && <span className="absolute left-5 top-10 w-0.5 h-full bg-[#0FC1A133]"></span>}
                  <span className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white bg-[#16c79a] rounded-full mr-5 shadow flex-shrink-0">{s.step}</span>
                  <div>
                    <div className="text-base sm:text-lg font-extrabold text-gray-900 mb-0.5">{s.title}</div>
                    <div className="text-xs sm:text-sm text-gray-700 leading-snug">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div
          className="
            flex flex-col justify-between h-full py-16
            px-6 sm:px-10
            bg-white
            rounded-[28px] lg:rounded-[28px]
            shadow-xl
          "
        >
          <h3 className="text-lg sm:text-3xl font-bold text-gray-900 mb-7 text-center">ทำการนัดหมาย</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
              <div className="relative w-full">
                <input
                  type="text"
                  id="name"
                  value={form.name}
                  onChange={(e) => setField("name")(e.target.value)}
                  placeholder=" "
                  required
                  autoComplete="name"
                  className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 placeholder-transparent"
                />
                <label htmlFor="name" className="absolute left-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] top-[-0.6rem] text-xs">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => setField("email")(e.target.value)}
                  placeholder=" "
                  required
                  autoComplete="email"
                  className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 placeholder-transparent"
                />
                <label htmlFor="email" className="absolute left-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] top-[-0.6rem] text-xs">
                  อีเมล <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type="tel"
                  id="tel"
                  value={form.phoneNumber}
                  onChange={(e) => setField("phoneNumber")(e.target.value)}
                  placeholder=" "
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 placeholder-transparent"
                />
                <label htmlFor="tel" className="absolute left-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] top-[-0.6rem] text-xs">
                  มือถือ <span className="text-red-500">*</span>
                </label>
              </div>

              {/* Line ID field (เพิ่มกลับมา) */}


              <div className="relative w-full">
                <select
                  id="symptom"
                  value={form.symptom}
                  onChange={(e) => setField("symptom")(e.target.value)}
                  required
                  className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 bg-transparent appearance-none"
                >
                  <option value="" disabled hidden></option>

                  <option value="Addition">Addition (อาการเสพติด)</option>
                  <option value="Anxiety">Anxiety (วิตกกังวล)</option>
                  <option value="Attention Deficit Disorder">Attention Deficit Disorder (อาการสมาธิสั้น)</option>
                  <option value="Dementia">Dementia (อาการที่เกิดจากการเสื่อมของเซลล์สมอง)</option>
                  <option value="Insomnia">Insomnia (อาการนอนไม่หลับ)</option>
                  <option value="Learning Disorders">Learning Disorders (อาการบกพร่องในการเรียนรู้)</option>
                  <option value="Migraine">Migraine (ปวดศีรษะไมเกรน)</option>
                  <option value="Mood Disorder">Mood Disorder (อาการผิดปกติด้านอารมณ์)</option>
                  <option value="Post-stroke condition">Post-stroke condition (อาการหลังจากเกิดความผิดปกติของหลอดเลือดสมอง)</option>
                  <option value="Stress">Stress (ภาวะเครียด)</option>
                  <option value="Others">Others (อื่นๆ)</option>
                </select>
                <label htmlFor="symptom" className="absolute left-0 top-2 text-gray-500 text-base transition-all peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] peer-valid:top-[-0.6rem] peer-valid:text-xs peer-valid:text-[#16c79a]">
                  อาการ <span className="text-red-500">*</span>
                </label>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="w-2 h-2 transition-transform duration-200 peer-focus:rotate-180 peer-focus:fill-[#16c79a]">
                    <ChevronDown size={15} />
                  </span>
                </div>
              </div>
              <div className="relative w-full">
                <input
                  type="text"
                  id="lineId"
                  value={form.lineID}
                  onChange={(e) => setField("lineID")(e.target.value)}
                  placeholder=" "
                  required
                  autoComplete="username"
                  className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 placeholder-transparent"
                />
                <label htmlFor="lineId" className="absolute left-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] top-[-0.6rem] text-xs">
                  Line ID <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="relative w-full">
                <input
                  type={focusedDate ? "date" : "text"}
                  id="appointmentDate"
                  value={focusedDate ? form.dateRaw : dateDisplay}
                  onFocus={() => setFocusedDate(true)}
                  onBlur={() => setFocusedDate(false)}
                  onChange={(e) => setField("dateRaw")(e.target.value)}
                  min={todayYMD}
                  required
                  className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 bg-transparent"
                />
                <label
                  htmlFor="appointmentDate"
                  className="absolute left-0 top-2 text-gray-500 text-base transition-all z-10 bg-white px-1 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] peer-valid:top-[-0.6rem] peer-valid:text-xs peer-valid:text-[#16c79a] tracking-wider"
                >
                  วันที่นัดหมาย
                </label>
              </div>
            </div>

            <div className="relative w-full">
              <input
                type="text"
                id="moreInfo"
                value={form.moreInfo}
                onChange={(e) => setField("moreInfo")(e.target.value)}
                placeholder=" "
                className="peer w-full border-b border-gray-300 focus:outline-none focus:border-[#16c79a] py-2 placeholder-transparent"
              />
              <label htmlFor="moreInfo" className="absolute left-0 text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-0.6rem] peer-focus:text-xs peer-focus:text-[#16c79a] top-[-0.6rem] text-xs">
                ข้อมูลเพิ่มเติม
              </label>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={submitting}
                className={`w-auto py-2.5 px-20 font-bold rounded-full transition text-lg shadow ${submitting || !isFormValid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-l from-[#00AAFF] to-[#106EE8] text-white hover:opacity-90"
                  }`}
              >
                {submitting ? "กำลังส่ง..." : "ยืนยัน"}
              </button>
            </div>

            {message && (
              <p className={`text-center mt-2 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {message.text}
              </p>
            )}

            <p className="text-xs text-gray-500 text-center mt-2 leading-snug">
              เมื่อคลิก “ยืนยัน” ถือว่าคุณรับทราบและยินยอมให้เรานำข้อมูลของคุณไปจัดการตาม{" "}
              {/* <a className="text-[#16c79a] underline cursor-pointer" href="#"> */}
              <a className="">
                นโยบายความเป็นส่วนตัวของ neurobalance
              </a>{" "}
              และยินดีรับข่าวสาร ข้อมูลสถิติที่เกี่ยวข้องจากเรา
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
