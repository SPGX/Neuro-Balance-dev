import Input from "../components/common/Input";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import { useState } from "react";
import InfoCard from "../components/common/InfoCard";
import SymptomCard from "../components/common/SymptomCard";

export default function ComponentsPreviewPage() {
  const [text, setText] = useState("");
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
    </div>
  );
}
