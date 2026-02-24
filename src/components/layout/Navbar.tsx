import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { menus } from './menus';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle } = useLanguage();

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); // init
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isTH = lang === 'th';
  const flagSrc = isTH ? '/thai.png' : '/eng.png';
  const label = isTH ? 'ไทย' : 'English';

  // ✅ solid background when scrolled OR menu open
  const solid = scrolled || open;

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* MOBILE TOP BAR */}
      <div
        className={classNames(
          "w-full md:hidden transition-all duration-300",
          solid
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent shadow-none"
        )}
      >
        <div className="py-2 h-[64px] flex items-center px-4">
          <Link to="/" className="flex items-center">
            <img src="/neuro_logo.svg" alt="Logo" className="h-[25px]" />
          </Link>

          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center justify-center px-1 py-1 rounded-full"
              aria-label="สลับภาษา"
            >
              <img src={flagSrc} alt={isTH ? 'TH' : 'EN'} className="w-6 h-6 rounded-full" />
            </button>

            <button
              type="button"
              className="flex items-center justify-center w-6 h-6"
              onClick={() => setOpen(v => !v)}
              aria-label="เปิดเมนู"
            >
              <div className="relative w-7 h-5 flex flex-col justify-between">
                <span className={classNames("block h-1 bg-gray-800 rounded transition-all duration-200", open && "rotate-45 translate-y-2")} />
                <span className={classNames("block h-1 bg-gray-800 rounded transition-all duration-200", open && "opacity-0")} />
                <span className={classNames("block h-1 bg-gray-800 rounded transition-all duration-200", open && "-rotate-45 -translate-y-2")} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <nav
        className={classNames(
          "w-full hidden md:block transition-all duration-300",
          solid
            ? "bg-white/90 backdrop-blur-md shadow-sm"
            : "bg-transparent shadow-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-0 h-[56px] grid grid-cols-[auto_1fr_auto] items-center">
          <Link to="/" className="flex items-center justify-self-start">
            <img src="/neuro_logo.svg" alt="Logo" className="h-8 w-auto" />
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
                      isActive ? 'border-b-2 border-teal-600 text-teal-600' : 'hover:text-teal-600'
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

      {/* overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-[48] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* mobile drawer */}
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
  );
}