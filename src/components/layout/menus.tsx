export interface MenuItem {
    label: string;
    path: string;
}

export const menus: MenuItem[] = [
    { label: 'หน้าแรก', path: '/' },
    { label: 'เกี่ยวกับ', path: '/about' },
    { label: 'คอร์สเทรนนิ่ง', path: '/courses' },
    { label: 'อาการ', path: '/symptoms' },
    { label: 'รีวิวลูกค้า', path: '/reviews' },
    { label: 'บทความ', path: '/article' },
    // { label: 'รูปภาพ', path: '/gallery' },
    { label: 'ติดต่อเรา', path: '/contact-us' },
];
