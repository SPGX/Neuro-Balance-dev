import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { menus } from './menus'
import { useLanguage } from '../../i18n/LanguageProvider'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, toggle } = useLanguage()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isTH = lang === 'th'
  const flagSrc = isTH ? '/thai.png' : 'eng.png'
  const label = isTH ? 'ไทย' : 'English'

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* <div
        className="w-full bg-[#3B786D80] backdrop-blur-[50px] flex items-center justify-between px-6 md:px-8 py-2"
        style={{ backgroundColor: '#3B786D80', backdropFilter: 'blur(50px)', WebkitBackdropFilter: 'blur(50px)' }}
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt="Logo"
              className="w-8 h-8 mr-2 shadow rounded-full"
            />
            <span className="nav-text">Neuro Balance</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div
            className="flex items-center rounded-full p-1 shadow"
            style={{ backgroundColor: '#345F57' }}
          >
            <button
              type="button"
              onClick={() => setLang('th')}
              className={classNames(
                'px-2.5 py-1 text-sm rounded-full transition',
                lang === 'th' ? 'bg-white text-black' : 'hover:bg-white/10 text-white'
              )}
              aria-pressed={lang === 'th'}
            >
              TH
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={classNames(
                'px-2.5 py-1 text-sm rounded-full transition',
                lang === 'en' ? 'bg-white text-black' : 'hover:bg-white/10 text-white'
              )}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </div>

        <button
          type="button"
          className="flex md:hidden items-center justify-center w-8 h-8"
          onClick={() => setOpen(v => !v)}
          aria-label="เปิดเมนู"
        >
          <div className="relative w-8 h-6 flex flex-col justify-between">
            <span className={classNames("block h-1 bg-white rounded transition-all duration-200", open && "rotate-45 translate-y-2.5")}></span>
            <span className={classNames("block h-1 bg-white rounded transition-all duration-200", open && "opacity-0")}></span>
            <span className={classNames("block h-1 bg-white rounded transition-all duration-200", open && "-rotate-45 -translate-y-2.5")}></span>
          </div>
        </button>
      </div> */}

      {/* mobile top bar */}
      <div className="w-full bg-white/90 backdrop-blur-md shadow-sm md:hidden">
        <div className="py-2 h-[64px] flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/neuro_logo.svg" alt="Logo" className="h-auto" />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center justify-center bg-white shadow px-1 py-1 rounded-full"
              aria-label="สลับภาษา"
            >
              <img src={flagSrc} alt={isTH ? 'TH' : 'EN'} className="w-8 h-8 rounded-full" />
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-10 h-10"
              onClick={() => setOpen(v => !v)}
              aria-label="เปิดเมนู"
            >
              <div className="relative w-7 h-5 flex flex-col justify-between">
                <span className={classNames("block h-1 bg-gray-800 rounded transition-all duration-200", open && "rotate-45 translate-y-2")}></span>
                <span className={classNames("block h-1 bg-gray-800 rounded transition-all duration-200", open && "opacity-0")}></span>
                <span className={classNames("block h-1 bg-gray-800 rounded transition-all duration-200", open && "-rotate-45 -translate-y-2")}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      <nav className="w-full bg-white/0 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-0 h-[56px] grid grid-cols-[auto_1fr_auto] items-center">
          <Link to="/" className="flex items-center justify-self-start">
            <img
              src="/neuro_logo.svg"
              alt="Logo"
              className="h-8 w-auto"
            />
          </Link>

          <div className="justify-self-center">
            <div className="flex items-center space-x-6 text-noto-black-nav-16">
              {menus.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    [
                      'cursor-pointer transition-colors',
                      isActive ? 'border-b-2 border-teal-600' : '',
                      isActive ? 'text-teal-600' : 'hover:text-teal-600'
                    ].join(' ')
                  }
                >
                  <span className="font-medium">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-self-end">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition shadow px-3 py-1.5 rounded-full"
              aria-label="สลับภาษา"
            >
              <img src={flagSrc} alt={isTH ? 'TH' : 'EN'} className="w-5 h-5 rounded-full" />
              <span className="text-sm font-medium text-gray-800">{label}</span>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-[48] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={classNames(
          "fixed top-[64px] right-0 w-72 h-[calc(100vh-64px)] bg-white/90 backdrop-blur-md z-[50] p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6 text-right text-gray-800 font-medium text-base">
          {menus.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                classNames('cursor-pointer transition-colors', isActive ? 'text-teal-600' : 'hover:text-teal-600')
              }
            >
              {label}
            </NavLink>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition shadow px-4 py-2 rounded-full text-sm"
              aria-label="สลับภาษา"
            >
              <img src={flagSrc} alt={isTH ? 'TH' : 'EN'} className="w-5 h-5 rounded-full" />
              <span className="font-medium text-gray-800">{label}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
