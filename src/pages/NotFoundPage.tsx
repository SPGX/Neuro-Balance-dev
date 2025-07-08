import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-6">
            <div className="text-center max-w-md">
                <h1 className="text-[8rem] leading-none font-extrabold text-teal-500 drop-shadow-lg">
                    404
                </h1>

                <p className="mt-4 text-xl font-semibold text-gray-700">
                    ไม่พบหน้าที่คุณต้องการ
                </p>
                <p className="mt-1 text-gray-500">
                    หน้าดังกล่าวอาจถูกย้าย หรือลบออกไปแล้ว
                </p>

                <Link
                    to="/"
                    className="inline-block mt-6 px-6 py-3 rounded-lg bg-teal-600 text-white shadow hover:bg-teal-700 transition-colors"
                >
                    กลับสู่หน้าแรก
                </Link>
            </div>
        </main>
    )
}
