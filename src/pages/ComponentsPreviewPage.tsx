import Input from "../components/common/Input";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useState } from "react";
import InfoCard from "../components/common/InfoCard";
import SymptomCard from "../components/common/SymptomCard";
import CoreValueCard from "../components/common/CoreValueCardProps";
import SplitSection, { Stat } from "../components/common/AboutExperienceSection";

export default function ComponentsPreviewPage() {
  const [text, setText] = useState("");
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

  return (
    <div className="p-8 md:p-20 space-y-16">
      <h1 className="text-3xl font-bold text-blue-600">🧩 Components Preview</h1>

      {/* ========== BUTTONS ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button (All Sizes & Variants)</h2>
        <div className="space-y-10">
          {/* Size: Small */}
          <div>
            <h3 className="text-lg font-medium mb-2">Size: Small</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button size="sm" variant="primary" color="blue">Blue</Button>
              <Button size="sm" variant="primary" color="cyan">Cyan</Button>
              <Button size="sm" variant="primary" color="teal">Teal</Button>
              <Button size="sm" variant="primary" color="gray">Gray</Button>

              <Button size="sm" variant="outline" color="blue">Outline Blue</Button>
              <Button size="sm" variant="outline" color="cyan">Outline Cyan</Button>
              <Button size="sm" variant="outline" color="teal">Outline Teal</Button>
              <Button size="sm" variant="outline" color="gray">Outline Gray</Button>

              <Button size="sm" variant="primary" disabled>Disabled</Button>
              <Button size="sm" variant="outline" disabled>Disabled</Button>
            </div>
          </div>

          {/* Size: Medium */}
          <div>
            <h3 className="text-lg font-medium mb-2">Size: Medium</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button size="md" variant="primary" color="blue">Blue</Button>
              <Button size="md" variant="primary" color="cyan">Cyan</Button>
              <Button size="md" variant="primary" color="teal">Teal</Button>
              <Button size="md" variant="primary" color="gray">Gray</Button>

              <Button size="md" variant="outline" color="blue">Outline Blue</Button>
              <Button size="md" variant="outline" color="cyan">Outline Cyan</Button>
              <Button size="md" variant="outline" color="teal">Outline Teal</Button>
              <Button size="md" variant="outline" color="gray">Outline Gray</Button>

              <Button size="md" variant="primary" disabled>Disabled</Button>
              <Button size="md" variant="outline" disabled>Disabled</Button>
            </div>
          </div>

          {/* Size: Large */}
          <div>
            <h3 className="text-lg font-medium mb-2">Size: Large</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button size="lg" variant="primary" color="blue">Blue</Button>
              <Button size="lg" variant="primary" color="cyan">Cyan</Button>
              <Button size="lg" variant="primary" color="teal">Teal</Button>
              <Button size="lg" variant="primary" color="gray">Gray</Button>

              <Button size="lg" variant="outline" color="blue">Outline Blue</Button>
              <Button size="lg" variant="outline" color="cyan">Outline Cyan</Button>
              <Button size="lg" variant="outline" color="teal">Outline Teal</Button>
              <Button size="lg" variant="outline" color="gray">Outline Gray</Button>

              <Button size="lg" variant="primary" disabled>Disabled</Button>
              <Button size="lg" variant="outline" disabled>Disabled</Button>
            </div>
          </div>
        </div>
      </section>
      {/* ========== INFO CARDS ========== */}
      <section>
        <h2 className="text-xl font-semibold mb-4">InfoCard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            variant="standard"
            title="Bio Balance"
            description="กระบวนการที่ช่วยปรับปรุงความสมดุลให้แก่สมอง และเพิ่มประสิทธิภาพการทำงานของสมองให้ดียิ่งขึ้นสร้างสารสื่อประสาทเพื่อรักษาสมดุลในสมองที่ได้รับการกระตุ้นพัฒนาเรื่องความจำ "
            image="/icon-bio.png"
            footer={
              <Button size="sm" variant="primary" className="text-sm px-4 py-1">
                รายละเอียด
              </Button>
            }
          />
          <InfoCard
            variant="highlight"
            title="มั่นใจ ปลอดภัย ไม่ใช้ยา"
            description="กระบวนการของเราปลอดภัยมีประสิทธิภาพสูงและไม่มีการใช้ยา"
            image="/medicine.png"
            footer={
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl">
                →
              </div>
            }
          />
          <InfoCard
            variant="highlight"
            title="มั่นใจ ปลอดภัย ไม่ใช้ยา"
            description="กระบวนการของเราปลอดภัยมีประสิทธิภาพสูงและไม่มีการใช้ยา"
            image="/medicine.png"
            footer={
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl">
                →
              </div>
            }
          />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">SymptomCard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <SymptomCard
            image="/adhd.png"
            title="อาการออทิสติก (ASD)"
            consultedCount={65}
            viewCount={12229}
          />
          <SymptomCard
            image="/adhd.png"
            title="อาการออทิสติก (ASD)"
            consultedCount={65}
            viewCount={12229}
          />   <SymptomCard
            image="/adhd.png"
            title="อาการออทิสติก (ASD)"
            consultedCount={65}
            viewCount={12229}
          />
        </div>
      </section>
      <section className="w-full max-w-[1440px] mx-auto relative">
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
          reverse
          stats={stats}
          partners={partners}
        />
      </section>


    </div>
  );
}
