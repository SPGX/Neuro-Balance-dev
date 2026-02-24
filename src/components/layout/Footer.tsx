export default function Footer() {
  // ✅ ในรูปมีแค่ IG / X / FB (ถ้าต้องการเพิ่ม YT/TT ค่อยใส่เพิ่มได้)
  const socials = [
    { name: "Instagram", icon: "/icons/ig.svg", href: "https://www.instagram.com/neurobalance" },
    { name: "X", icon: "/icons/x.svg", href: "#" },
    { name: "Facebook", icon: "/icons/fb.svg", href: "https://www.facebook.com/neurobalanceasia" },
  ];

  return (
    <footer className="bg-gradient-to-t from-white from-0% via-white via-80% to-[#E7F8F5] to-100%">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-12 py-10">
        {/* 2 columns */}
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          {/* LEFT */}
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/icons/icon-footer.svg"
                alt="Neuro Balance Logo"
                className="w-12 h-12 rounded-full object-contain"
              />
              <h3 className="text-2xl font-semibold text-[#111827]">Neuro Balance</h3>
            </div>

            <div className="mt-2 flex flex-col space-y-1.5 text-sm text-[#374151]">
              <a
                href="tel:022454227"
                className="text-[#12A594] font-semibold text-lg leading-tight hover:underline"
              >
                02-245-4227
              </a>

              <a href="mailto:neurobalanceasia@gmail.com" className="hover:underline leading-tight">
                neurobalanceasia@gmail.com
              </a>

              <address className="not-italic leading-relaxed break-words text-[#6B7280]">
                <span>65/111 อาคารทิปโก้ทาวเวอร์ นิสเเมนชั่นเซ็นเตอร์</span>
                <br />
                ชั้นที่ 12 ถนนพระราม9 แขวง
                <br />
                ห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310
              </address>
            </div>

            <a
              href="https://www.google.com/maps/place/Neuro+Balance/@13.7566974,100.5687757,1056m/data=!3m2!1e3!4b1!4m6!3m5!1s0x30e29ef2cc35a1f7:0xf3b188ff85698c8!8m2!3d13.7566974!4d100.5687757!16s%2Fg%2F11dxb0s0s9?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#EAF2FF] px-5 py-2 text-[#106EE8] font-semibold hover:bg-[#DDEBFF] transition"
            >
              Google Map
              <svg width="16" height="16" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.85352 1.52148H6.82082C5.50558 1.52148 4.47485 1.52147 3.67063 1.6296C2.84746 1.74027 2.19792 1.97122 1.68808 2.48105C1.17825 2.99088 0.947299 3.64043 0.836627 4.4636C0.728503 5.26781 0.728508 6.29854 0.728516 7.61379V7.67918C0.728508 8.99442 0.728503 10.0252 0.836627 10.8294C0.947298 11.6525 1.17825 12.3021 1.68808 12.8119C2.19792 13.3218 2.84746 13.5527 3.67063 13.6634C4.47485 13.7715 5.50558 13.7715 6.82083 13.7715H6.8862C8.20145 13.7715 9.23218 13.7715 10.0364 13.6634C10.8596 13.5527 11.5091 13.3218 12.0189 12.8119C12.5288 12.3021 12.7597 11.6525 12.8704 10.8294C12.9785 10.0252 12.9785 8.99442 12.9785 7.67917V7.64648" stroke="#106EE8" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M7.12112 6.77455C6.95424 6.94143 6.95424 7.212 7.12112 7.37888C7.288 7.54576 7.55857 7.54576 7.72545 7.37888L12.1239 2.98047V4.9935" stroke="#106EE8" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M12.5512 1.52148H9.50649" stroke="#106EE8" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </a>
          </div>

          {/* RIGHT */}
          <div className="lg:border-l border-gray-200 lg:pl-10 flex justify-center items-center">
            <p className="text-[#374151] text-sm md:text-base leading-relaxed">
              <span className="text-[#12A594] font-semibold">ศูนย์ฟื้นฟูสุขภาพ</span>
              แบบองค์รวมแนวทางใหม่ ที่รวบรวมเทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก ซึ่งเป็นที่ยอมรับ,
              มีมาตรฐาน และผลวิจัยรับรอง โดยทางศูนย์มีผู้เชี่ยวชาญทางด้านสุขภาพคอยดูแล แนะนำและให้คำปรึกษาที่มีประโยชน์กับลูกค้าตลอดการเข้ารับบริการ
            </p>
          </div>

        </div>
        <div className="grid gap-10 lg:grid-cols-[320px_1fr]">
          <div />
          <div className="flex flex-col sm:flex-col md:flex-row gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="text-sm text-[#111827] whitespace-nowrap">
              © สงวนลิขสิทธิ์ พ.ศ. 2567 - Neuro Balance
            </div>

            <div className="flex flex-col sm:flex-col md:flex-row gap-x-8 gap-y-2 text-xs text-[#111827] lg:justify-center whitespace-nowrap">
              <a href="#" className="hover:underline">นโยบายเว็บไซต์</a>
              <a href="#" className="hover:underline">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a>
              <a href="#" className="hover:underline">นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์</a>
            </div>

            <div className="flex w-full flex-row">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="inline-flex items-center justify-center w-8 h-8 hover:opacity-80 transition"
                >
                  <img src={s.icon} alt={s.name} className="w-5 h-5 object-contain" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}