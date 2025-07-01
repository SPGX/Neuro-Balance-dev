export default function AppointmentSection() {
  return (
    <section className="bg-[#f0fdfa] py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-teal-400">นัดหมาย</h3>
          <h2 className="text-5xl font-extrabold text-gray-900 leading-tight">
            เพื่อเข้ารับคำปรึกษา <br />ฟรี!
          </h2>
          <p className="text-lg text-gray-700">
            รับคำปรึกษาฟรีจากผู้เชี่ยวชาญของเรา!
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
              <span className="text-black text-2xl">✔</span>
              โทร 02-483-0900
            </div>
            <div className="bg-green-600 text-white px-3 py-1.5 rounded-full font-semibold text-sm">
              LINE @neurobalance
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">ทำการนัดหมาย</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  ชื่อ <span className="text-red-500">*</span>
                </label>
                <input type="text" className="w-full border-b border-gray-400 focus:outline-none py-1" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  อีเมล <span className="text-red-500">*</span>
                </label>
                <input type="email" className="w-full border-b border-gray-400 focus:outline-none py-1" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  มือถือ <span className="text-red-500">*</span>
                </label>
                <input type="tel" className="w-full border-b border-gray-400 focus:outline-none py-1" required />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  บริการที่สนใจ <span className="text-red-500">*</span>
                </label>
                <select className="w-full border-b border-gray-400 focus:outline-none py-1" required>
                  <option value="">เลือก...</option>
                  <option value="neuro">Neuro Balance</option>
                  <option value="bio">Bio Balance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                ช่วงเวลานัดหมาย <span className="text-red-500">*</span>
              </label>
              <input type="text" className="w-full border-b border-gray-400 focus:outline-none py-1" required />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-full hover:opacity-90 transition"
            >
              ยืนยัน
            </button>

            <p className="text-[11px] text-gray-500 text-center mt-2">
              เมื่อคลิก “ยืนยัน” ถือว่าคุณรับทราบและยินยอมให้เรานำข้อมูลของคุณไปจัดการตาม{' '}
              <span className="text-green-600 font-medium">นโยบายความเป็นส่วนตัวของ MelonCloud</span> และรับข่าวสาร ข้อมูลสถิติที่เกี่ยวข้องจากเรา
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
