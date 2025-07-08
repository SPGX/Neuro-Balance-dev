import SplitSection, { Stat } from '../components/common/AboutExperienceSection'
import CoreValueCard from '../components/common/CoreValueCardProps'
import InfoCard from '../components/common/InfoCard'

export default function AboutPage() {
  const aboutDesc = (
    <>
      <p>
        ศูนย์ฟื้นฟูสุขภาพแบบองค์รวมแนวทางใหม่ ที่รวบรวมเทคโนโลยีที่ทันสมัยจากทั่วทุกมุมโลก ซึ่งเป็นที่ยอมรับ, มีมาตรฐาน และผลวิจัยรับรอง
        โดยทางศูนย์มีผู้เชี่ยวชาญทางด้านสุขภาพคอยดูแลแนะนำและให้คำปรึกษาที่มีประโยชน์กับลูกค้าตลอดการเข้ารับบริการ ที่ Neurobalance
        เรามุ่งเน้นในการปรับความสมดุลย์ด้านสุขภาพแบบองค์รวม ไม่ว่าจะเป็นระบบไฟฟ้าของสมอง หรือ
        ระบบของเหลวภายในร่างกายโดยคัดสรรและนำเสนอโปรแกรมที่มีประสิทธิภาพที่เหมาะสมสำหรับบุคคลนั้นๆ
        เพื่อช่วยเสริมสร้างสภาวะของสมองและร่างกายให้อยู่ในสภาวะที่สมดุล และ คุณภาพชีวิตที่ดีขึ้นให้แก่ผู้เข้ามารับบริการ
      </p>
    </>
  )

  const stats: Stat[] = [
    { value: '45', label: 'หน่วยงานรัฐ' },
    { value: '200', label: 'เอกชน' },
    { value: '15,300', label: 'เคส' },
  ]

  const partners = [
    '/images/partner1.png',
    '/images/partner2.png',
    '/images/partner3.png',
    '/images/partner4.png',
    '/images/partner5.png',
  ]
  const cards = [
    {
      title: 'มั่นใจ ปลอดภัย ไม่ใช้ต้องยา',
      description:
        'กระบวนการของเราปลอดภัย มีประสิทธิภาพสูง และไม่มีการใช้ยา',
      image: '/feedback1.png',
    },
    {
      title: 'ปรับสมดุลร่างกาย',
      description:
        'ด้วยกระบวนการ Bio Balance สามารถปรับสมดุลของร่างกายให้…',
      image: '/feedback2.png',
    },
    {
      title: 'ปรับสมดุลสมอง',
      description:
        'เราทำการปรับสมดุลของสมองด้วยเทคนิคการทำ Neurofeedback',
      image: '/feedback4.png',
    },
  ]
  return (

    <div className="pt-10 space-y-28">
      <section className="w-full max-w-[1440px] mx-auto relative pt-8">
        <div className="grid grid-cols-1 md:grid-cols-4 overflow-hidden rounded-[16px] shadow-xl">
          <CoreValueCard
            title="Life"
            description="Core value Description"
            image="/images/core-value/core1.png"
          />
          <CoreValueCard
            title="Balance"
            description="Core value Description"
            image="/images/core-value/core2.png"
          />
          <CoreValueCard
            title="Neuro"
            description="Core value Description"
            image="/images/core-value/core3.png"
          />
          <CoreValueCard
            title="Therapy"
            description="Core value Description"
            image="/images/core-value/core4.png"
          />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-4">
          <button className="px-8 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold shadow-md hover:opacity-90">
            ปรึกษาฟรี
          </button>
          <button className="px-8 py-2 rounded-full bg-white text-gray-800 font-semibold shadow-md hover:bg-gray-100">
            ติดต่อเรา
          </button>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-0 space-y-28">
        <SplitSection
          eyebrow="เกี่ยวกับ"
          title="Neuro Balance"
          description={aboutDesc}
          image="/images/about-neurobalance.png"
          reverse

        />
        <SplitSection
          eyebrow="ประสบการณ์ของ"
          title="Neuro Balance"
          description={
            <p>
              เราทำงานร่วมกับหน่วยงานรัฐ และเอกชนทั่วประเทศ
              อีกทั้งดูแลรักษาเคสมากกว่า 15,300 เคส
            </p>
          }
          image="/images/experience.png"
          stats={stats}
          partners={partners}
        />
      </section>
      <section className="bg-gray-100 py-20">
        <div className="max-w-[1440px] mx-auto px-6">
          {/* Heading */}
          <h5 className="text-teal-600 font-semibold mb-2">ทำไมต้อง</h5>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-10">
            NEUROBALANCE
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map(({ title, description, image }) => (
              <InfoCard
                key={title}
                variant="highlight"
                title={title}
                description={description}
                image={image}
                footer={
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl">
                    →
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
