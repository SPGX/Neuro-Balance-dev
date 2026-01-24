export default function Footer() {
  const socials = [
    { name: 'สป.อว. Fanpage', icon: '/icons/fb.svg', href: 'https://www.facebook.com/neurobalanceasia' },
    { name: 'สป.อว.', icon: '/icons/x.svg', href: '#' },
    { name: 'สป.อว.', icon: '/icons/ig.svg', href: 'https://www.instagram.com/neurobalance' },
    { name: 'สป.อว. Channel', icon: '/icons/yt.svg', href: 'https://www.youtube.com/@neurobalance4293' },
    { name: '@สป.อว.', icon: '/icons/tt.svg', href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-t from-white to-[#e0f2fe] border-t border-teal-500 pt-10 pb-0 px-4 md:px-6 text-gray-800 text-sm relative">
      <div className="mx-auto w-full max-w-screen-xl md:grid md:grid-cols-2 md:items-start md:gap-8 lg:grid-cols-[420px_minmax(0,1fr)]">
        <div className="flex flex-col items-start gap-3 mb-6 md:mb-0 md:pr-8 lg:pr-0 lg:pl-6">
          <div className="flex items-center gap-3">
            <img src="/icons/icon-footer.svg" alt="Neuro Balance Logo" className="w-12 h-12 rounded-full object-contain" />
            <h3 className="text-noto-black-semi-20 font-semibold text-2xl">Neuro Balance</h3>
          </div>
          <div className="mt-2 flex flex-col space-y-1.5">
            <a href="tel:022454227" className="text-title-64-teal text-noto-green-semi-16 font-semibold hover:underline text-lg leading-tight">
              02-245-4227
            </a>
            <a href="mailto:neurobalanceasia@gmail.com" className="hover:underline leading-tight">
              <strong>neurobalanceasia@gmail.com</strong>
            </a>
            <address className="not-italic text-noto-black-12 leading-relaxed break-words">
              <span>65/111 อาคารทิปโก้ทาวเวอร์ นิสเเมนชั่นเซ็นเตอร์</span><br />
              ชั้นที่ 12 ถนนพระราม9 แขวง<br />
              ห้วยขวาง เขตห้วยขวาง กรุงเทพฯ 10310
            </address>
          </div>
          <a
            href="https://www.google.com/maps/place/Neuro+Balance/@13.7566974,100.5687757,1056m/data=!3m2!1e3!4b1!4m6!3m5!1s0x30e29ef2cc35a1f7:0xf3b188ff85698c8!8m2!3d13.7566974!4d100.5687757!16s%2Fg%2F11dxb0s0s9?entry=ttu&g_ep=EgoyMDI1MDkwMy4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-200 transition font-bold"
          >
            Google Map
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2483_3477)">
                <path d="M6.85352 1.52148H6.82082C5.50558 1.52148 4.47485 1.52147 3.67063 1.6296C2.84746 1.74027 2.19792 1.97122 1.68808 2.48105C1.17825 2.99088 0.947299 3.64043 0.836627 4.4636C0.728503 5.26781 0.728508 6.29854 0.728516 7.61379V7.67918C0.728508 8.99442 0.728503 10.0252 0.836627 10.8294C0.947298 11.6525 1.17825 12.3021 1.68808 12.8119C2.19792 13.3218 2.84746 13.5527 3.67063 13.6634C4.47485 13.7715 5.50558 13.7715 6.82083 13.7715H6.8862C8.20145 13.7715 9.23218 13.7715 10.0364 13.6634C10.8596 13.5527 11.5091 13.3218 12.0189 12.8119C12.5288 12.3021 12.7597 11.6525 12.8704 10.8294C12.9785 10.0252 12.9785 8.99442 12.9785 7.67917V7.64648C12.9785 7.41048 12.7872 7.21916 12.5512 7.21916C12.3152 7.21916 12.1239 7.41048 12.1239 7.64648C12.1239 9.00152 12.123 9.97481 12.0234 10.7155C11.9254 11.4439 11.7392 11.883 11.4146 12.2076C11.09 12.5322 10.6509 12.7184 9.92252 12.8163C9.18184 12.9159 8.20855 12.9168 6.85352 12.9168C5.49848 12.9168 4.52519 12.9159 3.78451 12.8163C3.05611 12.7184 2.61698 12.5322 2.29241 12.2076C1.96784 11.883 1.78159 11.4439 1.68366 10.7155C1.58407 9.97481 1.58317 9.00152 1.58317 7.64648C1.58317 6.29145 1.58407 5.31816 1.68366 4.57748C1.78159 3.84908 1.96784 3.40995 2.29241 3.08538C2.61698 2.76081 3.05611 2.57456 3.78451 2.47663C4.52519 2.37704 5.49848 2.37614 6.85352 2.37614C7.08952 2.37614 7.28084 2.18482 7.28084 1.94881C7.28084 1.7128 7.08952 1.52148 6.85352 1.52148Z" fill="#106EE8" />
                <path d="M7.12112 6.77455C6.95424 6.94143 6.95424 7.212 7.12112 7.37888C7.288 7.54576 7.55857 7.54576 7.72545 7.37888L12.1239 2.98047V4.9935C12.1239 5.22951 12.3152 5.42083 12.5512 5.42083C12.7872 5.42083 12.9785 5.22951 12.9785 4.9935V1.94881C12.9785 1.7128 12.7872 1.52148 12.5512 1.52148H9.50649C9.27049 1.52148 9.07917 1.7128 9.07917 1.94881C9.07917 2.18482 9.27049 2.37614 9.50649 2.37614H11.5195L7.12112 6.77455Z" fill="#106EE8" />
                <path d="M6.85352 1.52148H6.82082C5.50558 1.52148 4.47485 1.52147 3.67063 1.6296C2.84746 1.74027 2.19792 1.97122 1.68808 2.48105C1.17825 2.99088 0.947299 3.64043 0.836627 4.4636C0.728503 5.26781 0.728508 6.29854 0.728516 7.61379V7.67918C0.728508 8.99442 0.728503 10.0252 0.836627 10.8294C0.947298 11.6525 1.17825 12.3021 1.68808 12.8119C2.19792 13.3218 2.84746 13.5527 3.67063 13.6634C4.47485 13.7715 5.50558 13.7715 6.82083 13.7715H6.8862C8.20145 13.7715 9.23218 13.7715 10.0364 13.6634C10.8596 13.5527 11.5091 13.3218 12.0189 12.8119C12.5288 12.3021 12.7597 11.6525 12.8704 10.8294C12.9785 10.0252 12.9785 8.99442 12.9785 7.67917V7.64648C12.9785 7.41048 12.7872 7.21916 12.5512 7.21916C12.3152 7.21916 12.1239 7.41048 12.1239 7.64648C12.1239 9.00152 12.123 9.97481 12.0234 10.7155C11.9254 11.4439 11.7392 11.883 11.4146 12.2076C11.09 12.5322 10.6509 12.7184 9.92252 12.8163C9.18184 12.9159 8.20855 12.9168 6.85352 12.9168C5.49848 12.9168 4.52519 12.9159 3.78451 12.8163C3.05611 12.7184 2.61698 12.5322 2.29241 12.2076C1.96784 11.883 1.78159 11.4439 1.68366 10.7155C1.58407 9.97481 1.58317 9.00152 1.58317 7.64648C1.58317 6.29145 1.58407 5.31816 1.68366 4.57748C1.78159 3.84908 1.96784 3.40995 2.29241 3.08538C2.61698 2.76081 3.05611 2.57456 3.78451 2.47663C4.52519 2.37704 5.49848 2.37614 6.85352 2.37614C7.08952 2.37614 7.28084 2.18482 7.28084 1.94881C7.28084 1.7128 7.08952 1.52148 6.85352 1.52148Z" stroke="#106EE8" strokeWidth="0.5" strokeLinecap="round" />
                <path d="M7.12112 6.77455C6.95424 6.94143 6.95424 7.212 7.12112 7.37888C7.288 7.54576 7.55857 7.54576 7.72545 7.37888L12.1239 2.98047V4.9935C12.1239 5.22951 12.3152 5.42083 12.5512 5.42083C12.7872 5.42083 12.9785 5.22951 12.9785 4.9935V1.94881C12.9785 1.7128 12.7872 1.52148 12.5512 1.52148H9.50649C9.27049 1.52148 9.07917 1.7128 9.07917 1.94881C9.07917 2.18482 9.27049 2.37614 9.50649 2.37614H11.5195L7.12112 6.77455Z" stroke="#106EE8" strokeWidth="0.5" strokeLinecap="round" />
              </g>
              <defs>
                <clipPath id="clip0_2483_3477">
                  <rect width="14" height="14" fill="white" transform="translate(0 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </a>
        </div>

        <div className="flex-1 min-w-0">
          <hr className="border-t border-gray-300 mb-4 md:hidden" />
          <div className="md:border-l border-gray-300 md:pl-8 flex items-center md:min-h-[140px] mt-6 md:mt-0">
            <p className="text-gray-800 text-left text-sm md:text-base leading-normal md:leading-relaxed break-words">
              <span className="text-title-16-teal text-noto-green-semi-14 font-semibold text-base md:text-lg">
                ศูนย์ฟื้นฟูสุขภาพ
              </span>
              แบบองค์รวมแนวทางใหม่
              <br className="block md:hidden" />
              ที่รวบรวม เทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก ซึ่งเป็นที่ยอมรับ,
              <br className="block md:hidden" />
              มีมาตรฐาน และผลวิจัยรับรอง
              <br className="block md:hidden" />
              โดยทางศูนย์มีผู้เชี่ยวชาญทางด้านสุขภาพคอยดูแล
              <br className="block" />
              แนะนำและให้คำปรึกษาที่มีประโยชน์กับลูกค้าตลอดการเข้ารับบริการ
            </p>
          </div>

          <div className="mt-1 md:mt-6 md:pl-8 text-sm flex flex-col md:flex-row md:items-center md:justify-between gap-y-2">
            <div className="font-normal md:font-semibold">
              © สงวนลิขสิทธิ์ พ.ศ. 2567 - Neuro Balance
            </div>
            <div className="flex flex-wrap justify-end gap-x-8 gap-y-2">
              <a href="#" className="hover:underline font-normal md:font-semibold">นโยบายเว็บไซต์</a>
              <a href="#" className="hover:underline font-normal md:font-semibold">นโยบายการคุ้มครองข้อมูลส่วนบุคคล</a>
              <a href="#" className="hover:underline font-normal md:font-semibold">นโยบายการรักษาความมั่นคงปลอดภัยเว็บไซต์</a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 w-full">
        <div className="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-12">
          <div className="w-full flex items-center justify-start gap-4 sm:gap-5 py-5">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="
            inline-flex items-center justify-center
            w-14 h-14 sm:w-16 sm:h-16
            rounded-full border-2 border-gray-300
            bg-white
            shadow-[0_1px_6px_rgba(0,0,0,0.04)]
            transition will-change-transform transform-gpu
            hover:scale-105 hover:border-teal-500
            focus:outline-none focus:ring-2 focus:ring-teal-500/30
          "
              >
                <img
                  src={s.icon}
                  alt={s.name}
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-80"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}