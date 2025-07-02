import Input from '../components/common/Input'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import { useState } from 'react'

export default function ComponentsPreviewPage() {
  const [text, setText] = useState('')

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold text-blue-600">🧩 Components Preview</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Button</h2>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Input</h2>
        <Input
          label="ชื่อ"
          name="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="กรอกชื่อของคุณ"
        />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Card</h2>
        <Card
          title="บริการของเรา"
          description="ให้คำปรึกษาและฟื้นฟูสุขภาพด้วยเทคโนโลยี"
          icon="/images/service-consult.png"
        >
          <Button variant="outline">ดูเพิ่มเติม</Button>
        </Card>
      </section>
    </div>
  )
}
