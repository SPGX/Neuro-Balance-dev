export default function Footer() {
  return (
    <footer className="bg-gradient-to-t from-white to-[#e0f2fe] border-t border-teal-500 pt-10 pb-6 px-6 text-gray-800 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:gap-10">
        {/* Logo + Contact */}
        <div className="md:w-1/3 flex flex-col items-start gap-3 mb-6 md:mb-0">
          <div className="flex items-center gap-3">
            <img src="/icon-footer.png" alt="Neuro Balance Logo" className="w-12 h-12 rounded-full object-contain" />
            <h3 className="text-xl font-bold">Neuro Balance</h3>
          </div>
          <a href="tel:022454227" className="text-lg font-bold text-teal-600 hover:underline">
            02-245-4227
          </a>
          <a href="mailto:neurobalanceasia@gmail.com" className="hover:underline">
            <strong>brneurobalanceasia@gmail.com</strong>
          </a>
          <address className="not-italic leading-relaxed text-gray-600">
            65/111 อาคารทิปโก้ทาวเวอร์ นิสเเมนชั่นเซ็นเตอร์<br />
            ชั้นที่ 12 ถนนพระราม9 แขวง<br />
            ห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310
          </address>
          <a
            href="https://goo.gl/maps/example"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-200 transition"
          >
            Google Map <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 3l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>

        {/* Description */}
        <div className="md:flex-1 border-t md:border-t-0 md:border-l md:pl-10 border-teal-300 pt-6 md:pt-0">
          <p className="leading-relaxed text-gray-700">
            <span className="font-bold text-teal-600">ศูนย์ฟื้นฟูสุขภาพ</span> แบบองค์รวมแนวทางใหม่ ที่รวบรวม
            เทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก ซึ่งเป็นที่ยอมรับ มีมาตรฐาน และผลวิจัยรับรอง โดยทางศูนย์มีผู้เชี่ยวชาญทางด้านสุขภาพคอยดูแล
            แนะนำและให้คำปรึกษาที่มีประโยชน์กับลูกค้าตลอดการเข้ารับบริการ
          </p>
        </div>
      </div>

      {/* bottom links */}
      <div className="max-w-7xl mx-auto mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-700 text-xs">
        <span>© สงวนลิขสิทธิ์ พ.ศ. 2567 - Neuro Balance</span>
        <a href="#" className="hover:underline">นโยบายเว็บไซต์</a>
        <a href="#" className="hover:underline">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a>
        <a href="#" className="hover:underline">นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์</a>
      </div>
    </footer>
  );
}