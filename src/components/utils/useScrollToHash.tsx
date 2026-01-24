import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function useScrollToHash() {
    const { hash } = useLocation()

    useEffect(() => {
        if (!hash) return
        const el = document.querySelector(hash) as HTMLElement | null
        if (!el) return
        setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
    }, [hash])
}
