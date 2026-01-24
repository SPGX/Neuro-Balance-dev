import { Link } from 'react-router-dom'
import { menus } from '../layout/menus';
import { FaAngleRight } from "react-icons/fa6";

type BreadcrumbProps = {
    path: string[];
    isBanner?: boolean;
}

export default function Breadcrumb({ path, isBanner = false }: BreadcrumbProps) {
    const getHref = (label: string) => {
        const menu = menus.find(m => m.label === label)
        return menu?.path || '#'
    }

    return (
        <nav className="text-xs sm:text-sm text-gray-500 space-x-1 border-b border-[#FFFFFF4D] pb-1 w-full flex flex-row max-w-[1440px] mx-auto">
            {path.map((segment, i) => (
                <span key={i} className='flex flex-row items-center ml-4'>
                    {i > 0 && <span className={`${isBanner ? "text-white" : "text-black-70"} `}><FaAngleRight /></span>} 
                    {i < path.length - 1 ? (
                        <Link to={getHref(segment)} className={`hover:underline ${isBanner ? "text-[#FFFFFF80]" : "text-black-70"} pr-1 `}>
                            {segment}
                        </Link>
                    ) : (
                        <p className={` ${isBanner ? "text-white" : "text-black"} font-semibold pl-2 overflow-hidden text-ellipsis`}>{segment}</p>
                    )}
                </span>
            ))}
        </nav>
    )
}
