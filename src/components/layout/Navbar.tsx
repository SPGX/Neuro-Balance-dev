import { NavLink } from 'react-router-dom'

const menus = [
  { label: 'หน้าแรก', path: '/' },
  { label: 'เกี่ยวกับ', path: '/about' },
  { label: 'คอร์สเทรนนิ่ง', path: '/courses' },
  { label: 'อาการ', path: '/symptoms' },
  { label: 'รีวิวลูกค้า', path: '/reviews' },
  { label: 'บทความ', path: '/blog' },
  { label: 'รูปภาพ', path: '/gallery' },
  { label: 'ติดต่อเรา', path: '/contact-us' },
]

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 hidden md:block">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-center space-x-6 text-sm font-medium text-gray-800">
        {menus.map(({ label, path }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              [
                'relative cursor-pointer transition-colors',
                isActive ? 'text-teal-600' : 'hover:text-teal-600',
              ].join(' ')
            }
          >
            {({ isActive }) => (
              <>
                <span>{label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
