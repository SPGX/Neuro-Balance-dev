import React from 'react'
import useSWR from 'swr'
import { fetchArticleList } from '../lib/api'
import HeroSection from '../components/sections/Home/HeroSection'
import ServiceCards from '../components/sections/Home/ServiceCards'
import AppointmentForm from '../components/sections/Home/AppointmentForm'
import BalanceTypes from '../components/sections/Home/BalanceTypes'
import SymptomSection from '../components/sections/Home/SymptomSection'
import AboutNeuroBalance from '../components/sections/Home/AboutIntro'
import NeuroFeedbackSection from '../components/sections/Home/NeuroFeedbackSection'
import FAQSection from '../components/sections/Home/FAQSection'
import BlogCarouselSection from '../components/sections/Home/BlogCarouselSection'

type Raw = Record<string, any>

type ApiArticle = {
  id: number
  documentId: string
  title: string
  publishedAt?: string
  displayDate?: string
  banner?: { image?: any; title?: string } | null
  viewCountAndSocial?: { viewed?: number } | null
}

export type GridArticle = {
  id: number
  documentId: string
  Title: string
  date: string
  viewd: number
  image: { formats?: { small?: { url: string } }; url: string }
}

function normalizeApiArticle(raw: Raw): ApiArticle {
  const n = raw?.article ?? raw
  const title = n?.title ?? raw?.title ?? raw?.Card?.title ?? raw?.Title ?? ''
  const documentId = n?.documentId ?? raw?.documentId ?? raw?.slug ?? ''
  const publishedAt = n?.publishedAt ?? raw?.publishedAt ?? raw?.date ?? ''
  const displayDate = n?.displayDate ?? raw?.displayDate ?? raw?.dateText ?? raw?.Card?.dateText ?? ''
  const image = n?.banner?.image ?? raw?.banner?.image ?? raw?.image ?? raw?.Card?.image ?? null
  const bannerTitle = n?.banner?.title ?? raw?.banner?.title ?? undefined
  const viewed = n?.viewCountAndSocial?.viewed ?? raw?.viewCountAndSocial?.viewed ?? raw?.Card?.viewed ?? raw?.viewed ?? 0
  return {
    id: Number(n?.id ?? raw?.id ?? Math.random() * 1e6),
    documentId,
    title,
    publishedAt,
    displayDate,
    banner: { image, title: bannerTitle },
    viewCountAndSocial: { viewed },
  }
}

function toGrid(a: ApiArticle): GridArticle {
  const iso = a.displayDate && String(a.displayDate).trim()
    ? String(a.displayDate).trim()
    : (a.publishedAt || '').split('T')[0] || ''
  let formatted = iso
  if (iso && /^\d{4}-\d{2}-\d{2}$/.test(iso)) {
    const [year, month, day] = iso.split('-')
    const buddhistYear = String(Number(year) + 543).slice(-2)
    formatted = `${day}/${month}/${buddhistYear}`
  }
  return {
    id: a.id,
    documentId: a.documentId ?? '',
    Title: a.banner?.title ?? a.title ?? '',
    date: formatted,
    viewd: a.viewCountAndSocial?.viewed ?? 0,
    image: {
      ...(a.banner?.image ?? {}),
      url: a.banner?.image?.url ?? '/default-image.svg',
    },
  }
}

export default function HomePage() {
  const { data } = useSWR(['home-articles'], fetchArticleList, { revalidateOnFocus: false })
  const listRaw: Raw[] = Array.isArray(data?.data) ? data!.data : []
  const normalized: ApiArticle[] = listRaw.map(normalizeApiArticle)
  const gridArticles: GridArticle[] = normalized.map(toGrid).filter(x => !!x.documentId)
  const topForCarousel = gridArticles.slice(0, 9)

  return (
    <>
      <HeroSection />
      <ServiceCards />
      <AboutNeuroBalance />
      <BalanceTypes />
      <NeuroFeedbackSection />
      <SymptomSection />
      <AppointmentForm />
      <FAQSection />
      <BlogCarouselSection articles={topForCarousel} />
    </>
  )
}
