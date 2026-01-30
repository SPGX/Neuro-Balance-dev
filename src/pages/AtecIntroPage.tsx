import React from 'react';
import { Link } from 'react-router-dom';

export default function AtecIntroPage() {
    return (
        <section className="mt-20 bg-white py-20 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1D2126] font-noto leading-tight">
                            ทำแบบประเมินพฤติกรรม
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1D2126] font-noto leading-tight">
                            (ATEC)
                        </h1>

                        <svg
                            className="mt-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                            viewBox="0 0 50 50"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M33.3333 8.33789C37.8646 8.36311 40.3186 8.56405 41.9194 10.1649C43.75 11.9954 43.75 14.9417 43.75 20.8343V33.3343C43.75 39.2268 43.75 42.1731 41.9194 44.0037C40.0888 45.8343 37.1426 45.8343 31.25 45.8343H18.75C12.8574 45.8343 9.91116 45.8343 8.08058 44.0037C6.25 42.1731 6.25 39.2268 6.25 33.3343V20.8343C6.25 14.9417 6.25 11.9954 8.08058 10.1649C9.68138 8.56405 12.1354 8.36311 16.6667 8.33789" stroke="#1D2126" strokeWidth="3" />
                            <path d="M21.875 29.168H35.4167" stroke="#1D2126" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                            <path d="M14.5859 29.168H15.6276" stroke="#1D2126" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                            <path d="M14.5859 21.875H15.6276" stroke="#1D2126" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                            <path d="M14.5859 36.457H15.6276" stroke="#1D2126" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                            <path d="M21.875 21.875H35.4167" stroke="#1D2126" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                            <path d="M21.875 36.457H35.4167" stroke="#1D2126" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
                            <path d="M16.6641 7.29297C16.6641 5.56708 18.0632 4.16797 19.7891 4.16797H30.2057C31.9316 4.16797 33.3307 5.56708 33.3307 7.29297V9.3763C33.3307 11.1022 31.9316 12.5013 30.2057 12.5013H19.7891C18.0632 12.5013 16.6641 11.1022 16.6641 9.3763V7.29297Z" stroke="#1D2126" strokeWidth="3" />
                        </svg>
                    </div>

                    <p className="text-gray-700 max-w-2xl mx-auto">
                        แบบประเมินนี้ถูกสร้างขึ้นตามแนวคิดของ Rimland Rimland, Ph.D. & Stephen M. Edelson, Ph.D. ได้รับการแปลโดย วิทยาลัยแพทยศาสตร์ นครราชสีมา และ ทีมกรรณิการ์ กุศลพนา
                    </p>
                    <p className="mt-4 font-bold">
                        คำชี้แจง: ข้อมูลที่ท่านตอบในแบบประเมินนี้สำหรับผู้ปกครอง หรือผู้ดูแลเด็ก กรุณาอ่านคำถามต่อไปนี้โดยละเอียดและ
                    </p>
                    <p className="mt-4 text-[16px] sm:text-[20px] text-[#106EE8] font-medium border border-[#106EE8] rounded-full px-5 py-2 sm:px-6 inline-block">
                        เลือกคำตอบที่ท่านคิดว่าเด็กในคำอธิบายพฤติกรรมมีความถี่ตามที่เกิดขึ้นภายใน 1 เดือนที่ผ่านมา
                    </p>
                </div>
                <div className="bg-[#F5F5F5] rounded-[20px] p-6 md:p-8 mb-8 space-y-6 text-[#1D2126]">
                    <div>
                        <h3 className="text-[20px] font-bold mb-4">
                            มีข้อคำถามทั้งหมด 77 ข้อ แบ่งเป็น 4 ด้าน คือ
                        </h3>
                        <ol className="list-decimal ml-6 space-y-2 text-[18px] font-medium">
                            <li>ด้านการพูด การใช้ภาษาติดต่อสื่อสาร จำนวน 14 ข้อ</li>
                            <li>ด้านความสามารถสังคม จำนวน 20 ข้อ</li>
                            <li>ด้านประสาทรับความรู้สึกและการรับรู้ จำนวน 18 ข้อ</li>
                            <li>ด้านสุขภาพ ร่างกาย และพฤติกรรม จำนวน 25 ข้อ</li>
                        </ol>
                    </div>

                    <div className="bg-[#EDEDED] rounded-[16px] p-6">
                        <h3 className="text-[18px] font-bold mb-4">ข้อกำหนด</h3>
                        <ul className="list-disc ml-6 space-y-2 text-[16px] font-medium">
                            <li>เราไม่มีการเผยแพร่ข้อมูลของผู้ทำแบบประเมิน ไม่มีการดัดแปลงและนำไปใช้ในเชิงพาณิชย์ทั้งสิ้น</li>
                            <li>แบบประเมินนี้ไม่ใช่การวินิจฉัยหรือบ่งบอกว่าบุคคลนั้นมีภาวะออทิสซึมหรือไม่</li>
                            <li>เป็นเพียงการเปรียบเทียบระดับปัญหาของพฤติกรรมตามช่วงเวลาที่เปลี่ยนไป</li>
                            <li>ผู้ปกครองสามารถใช้แบบประเมินนี้เพื่อประเมินการเปลี่ยนแปลงของระดับปัญหา ก่อน-หลังการพัฒนาโดยวิธีต่างๆ ได้ด้วยตนเอง (Pre-Post Evaluation)</li>
                        </ul>
                    </div>
                </div>


                <div className="text-center">
                    <Link to="/atec/question">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md">
                            เริ่มทําแบบประเมิน
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
