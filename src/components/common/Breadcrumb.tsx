import { Link } from 'react-router-dom'

type BreadcrumbProps = {
    path: string[]
}

export default function Breadcrumb({ path }: BreadcrumbProps) {
    const toSlug = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .replace(/ /g, '-')
            .replace(/[^\w-ก-๙]/g, '')

    const getHref = (index: number) =>
        '/' + path.slice(1, index + 1).map(toSlug).join('/')

    return (
        <nav className="text-sm text-gray-500 mb-6 space-x-1">
            {path.map((segment, i) => (
                <span key={i}>
                    {i > 0 && <span>/</span>}
                    {i < path.length - 1 ? (
                        <Link to={getHref(i)} className="hover:underline text-teal-600">
                            {segment}
                        </Link>
                    ) : (
                        <span className="text-gray-700">{segment}</span>
                    )}
                </span>
            ))}
        </nav>
    )
}
