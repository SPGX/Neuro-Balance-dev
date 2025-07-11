import Breadcrumb from "../../components/common/Breadcrumb";
import ContentBlock from "../../components/common/ContentBlock";
import IntroBlock from "../../components/common/IntroBlock";
import QuoteBlock from "../../components/common/QuoteBlock";

export default function BioBalancePage() {
    const bioIntroParagraphs = [
        'ร่างกายคนเรามีปัจจัยทางชีวเคมีแบบธรรมชาติที่มีอิทธิพลต่อบุคลิกภาพ พฤติกรรม สุขภาพจิต และการทำงานของภูมิคุ้มกัน',
        'Bio balance เป็นการเสริมสร้างและฟื้นฟูแนวใหม่ โดยอาศัยคลื่นพลังงานแม่เหล็กที่มีความถี่ต่ำ ซึ่งจะส่งผลต่อร่างกายให้เกิดการกระตุ้นการหมุนเวียนและเพิ่มศักยภาพการไหลเวียนของโลหิตได้ดีขึ้น ช่วยเพิ่มพลังให้กับเซลล์ในร่างกายเพื่อความแข็งแรง',
        'มากไปกว่านั้นจะทำให้กระบวนการสื่อสารระหว่างเซลล์สามารถติดต่อสื่อถึงกันได้อย่างมีประสิทธิภาพ ช่วยให้การตอบสนองของเซลล์ต่อสารเคมีที่เป็นอันตรายต่อร่างกายถูกขับออกมา จึงทำให้สุขภาพร่างกายมีความแข็งแรงมากขึ้น',
        'Bio balance จึงเป็นทางเลือกใหม่และปลอดภัยสำหรับคนทุกคนที่ต้องการดูแลสุขภาพ'
    ]

    return (
        <section className="max-w-[1440px] mx-auto px-6 py-20 space-y-12">
            <ContentBlock
                variant="hero"
                title="Bio Balance"
                bgImage="/images/trainings/bio.png"
                label="คอร์สเทรนนิ่ง"
                size="lg"
            />

            <div className="mt-6">
                <Breadcrumb path={['หน้าแรก', 'คอร์สเทรนนิ่ง', 'Bio Balance']} />
            </div>
            <QuoteBlock>
                <span className="text-black font-bold">Bio balance</span> เป็นการเสริมสร้างและ
                <span className="text-teal-500 font-bold">ฟื้นฟูแนวใหม่</span><br />
                โดยอาศัย
                <span className="text-teal-500 font-bold">คลื่นพลังงานแม่เหล็ก</span>
                ที่มีความถี่ต่ำ
            </QuoteBlock>

            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold">Bio Balance</h1>
                <p className="text-gray-700 leading-relaxed">
                    รายละเอียดคอร์ส Bio Balance …
                </p>
            </div>
            <IntroBlock
                title="บทนำ"
                icon="/images/trainings/brain-icon.png"
                paragraphs={bioIntroParagraphs}
            />
        </section>
    );
}
