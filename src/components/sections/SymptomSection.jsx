export default function SymptomSection() {
  return (
    <section
      className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-4 md:px-8 text-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-teal-500 font-semibold text-lg">Symptom</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">
            คุณมีปัญหาแบบนี้บ้างหรือไม่?
          </h2>
        </div>

        <div className="md:flex bg-white border border-teal-300 rounded-2xl p-6 md:p-10 shadow-lg">
          <div className="md:w-1/2 md:pr-10 border-r border-teal-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">เด็ก</h3>
            <p className="text-sm text-gray-600 mb-6">ระบบจิตจดจ่อเสถียรและประสิทธิภาพสูง</p>
            <ul className="space-y-4 pl-4 list-disc marker:text-teal-400 text-base leading-relaxed">
              <li>
                <span className="font-semibold text-gray-800">สมาธิสั้น</span>
                <div className="text-gray-600">ระบบจิตจดจ่อเสถียรและประสิทธิภาพสูง</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">กระบวนการเรียนรู้</span>
                <div className="text-gray-600">ป้องกัน Downtime ให้ VM ทำงานได้ต่อเนื่อง</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">ประสาทสัมผัสและการเคลื่อนไหว</span>
                <div className="text-gray-600">ปรับขนาด CPU/RAM ของ VM ได้ทันทีโดยไม่ต้องปิดเครื่อง</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">การสื่อสาร</span>
                <div className="text-gray-600">ตั้งค่าการจัดเก็บข้อมูลให้เหมาะกับ Workload</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">ความจำ</span>
                <div className="text-gray-600">ใช้ RAM อย่างมีประสิทธิภาพ ลดการใช้ทรัพยากรเกินจำเป็น</div>
              </li>
            </ul>
          </div>

          <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0">
            <h3 className="text-xl font-bold text-gray-900 mb-2">ผู้ใหญ่ / ผู้สูงอายุ</h3>
            <p className="text-sm text-gray-600 mb-6">ระบบจิตจดจ่อเสถียรและประสิทธิภาพสูง</p>
            <ul className="space-y-4 pl-4 list-disc marker:text-teal-400 text-base leading-relaxed">
              <li>
                <span className="font-semibold text-gray-800">การเคลื่อนไหว</span>
                <div className="text-gray-600">รองรับการทำงานร่วมกันในผู้สูงวัยของ Microsoft</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">กระบวนการความคิดและการสื่อสาร</span>
                <div className="text-gray-600">ปรับตำแหน่ง VM เพื่อกระจายโหลดอย่างเหมาะสม</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">ความจำ</span>
                <div className="text-gray-600">สำรองข้อมูลโดยรักษาสถานะของแอปให้อบอุ่นดี</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">การนอนหลับ</span>
                <div className="text-gray-600">รองรับการประมวลผลกราฟิกระดับสูงและ AI/ML</div>
              </li>
              <li>
                <span className="font-semibold text-gray-800">ความเครียด</span>
                <div className="text-gray-600">รองรับการประมวลผลกราฟิกระดับสูงและ AI/ML</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
