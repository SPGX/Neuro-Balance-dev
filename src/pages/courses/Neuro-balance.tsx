import Breadcrumb from "../../components/common/Breadcrumb";
import ContentBlock from "../../components/common/ContentBlock";
import IntroBlock from "../../components/common/IntroBlock";
import QuoteBlock from "../../components/common/QuoteBlock";

export default function NeuroBalancePage() {
    return (
        <section className="max-w-[1440px] mx-auto px-6 py-20 space-y-16">
            <ContentBlock
                variant="hero"
                title="Neuro Balance"
                bgImage="/images/trainings/neuro.png"
                label="คอร์สเทรนนิ่ง"
                size="lg"
            />

            <div className="mt-6">
                <Breadcrumb path={['หน้าแรก', 'คอร์สเทรนนิ่ง', 'Neuro Balance']} />
            </div>

            <QuoteBlock>
                <span className="text-black font-bold">Neuro Balance</span> คือการ
                <span className="text-teal-500 font-bold"> ปรับสมดุลสมอง</span><br />
                ให้มีประสิทธิภาพมากยิ่งขึ้นโดยใช้กระบวนการ
                <span className="text-teal-500 font-bold"> Neurofeedback Training</span>
            </QuoteBlock>

            <IntroBlock
                title="บทนำ"
                icon="/images/trainings/brain-icon.png"
                paragraphs={[
                    'จะดีกว่าไหมถ้าคุณมีวิธีการบริหารการทำงานของสมองและสามารถควบคุมการทำงานเหล่านั้นได้ ด้วยตัวของคุณเอง',
                    'แน่นอนว่าสมองเป็นอวัยวะที่สำคัญและทำหน้าที่ได้อย่างมหัศจรรย์ ซึ่งสามารถควบคุมและสั่งการการเคลื่อนไหว  รักษาสมดุลภายในร่างกาย หน้าที่ของสมองยังเกี่ยวข้องกับรับรู้ การคิด การจำ และอารมณ์ ในแต่ละวันสมองมีเรื่องราวให้ต้องจดจำ คิดวิเคราะห์ และหาทางแก้ไขปัญหาต่างๆมากมายนับไม่ถ้วน แม้กระทั้งเวลานอนหลับ สมองบางส่วนก็ยังทำงาน ทำให้ร่างกายเกิดความอ่อนแอ มีความเครียด ซึ่งอาจจะเป็นที่มาของการทำให้เกิดโรคต่างๆ ได้ ดังนั้นการดูแลสมองจึงเป็นสิ่งสำคัญและจำเป็นที่ต้องใส่ใจเป็นพิเศษ เราควรรีบทำการฟื้นฟูสร้างความสมดุลให้สมอง เพื่อจะได้เพิ่มประสิทธิภาพของสมองในการทำงานให้ดียิ่งขึ้น',
                    '<span class="text-teal-600 font-semibold">โดยรวมคือการทำให้มีสุขภาพที่ดี การดูแลสุขภาพรักษากายและใจให้พร้อมสำหรับการดำเนินชีวิตใหม่ๆในแต่ละวัน</span> ซึ่งไม่ได้ถือว่าเป็นเรื่องยาก หากแต่รู้จักการจัดระบบสมองให้มีความสมดุล'
                ]}

            />

            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold">Neuro Balance</h1>
                <p className="text-gray-700 leading-relaxed">
                    รายละเอียดคอร์ส Neuro Balance
                </p>
            </div>
        </section>
    );
}
