const menus = ['หน้าแรก', 'เกี่ยวกับ', 'คอร์สเทรนนิ่ง', 'อาการ', 'รีวิวลูกค้า', 'บทความ', 'รูปภาพ', 'ติดต่อเรา'];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center space-x-6 text-sm font-medium text-gray-800">
        {menus.map((item, i) => (
          <div key={i} className="relative group cursor-pointer">
            <span className="group-hover:text-teal-600">{item}</span>
            {i === 0 && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
