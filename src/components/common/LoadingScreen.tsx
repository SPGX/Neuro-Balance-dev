export default function LoadingScreen() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-white fixed top-0 left-0 z-[9999]">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-700 font-medium">กำลังโหลดข้อมูล...</p>
            </div>
        </div>
    );
}
