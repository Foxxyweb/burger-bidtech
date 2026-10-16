'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { ease, duration } from '@/lib/motion';
import { BRAND } from '@/lib/constants';
import { useLanguage, LANGUAGES, LanguageOption } from '@/context/LanguageContext';

const LOGO_SRC = '/assets/logo3 (2).png';

export default function Header({ solid = true }: { solid?: boolean } = {}) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const { t, selectedLang, setSelectedLang } = useLanguage();
  
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 120 && !menuOpen);
  });

  const showBackground = scrolled || solid;

  const handleSelectLanguage = (lang: LanguageOption) => {
    setSelectedLang(lang);
    setLangOpen(false);
    // ❌ HAPUS cookie googtrans & reload — tidak perlu lagi
  };

  // Daftar link pakai terjemahan
  const navLinks = [
    { href: '/', labelKey: 'home' },
    { href: '/tentang', labelKey: 'about' },
    { href: '/menu', labelKey: 'menu' },
    { href: '/galeri', labelKey: 'gallery' },
    { href: '/tim', labelKey: 'team' },
    { href: '/kontak', labelKey: 'contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: duration.base, ease: ease.out }}
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        'transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-smooth',
        showBackground
          ? 'bg-cream/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(89,65,60,0.12)]'
          : 'bg-transparent'
      )}
    >
      <nav className="shell flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <Link
          href={(process.env.NEXT_PUBLIC_DEMO_BASE_PATH || '') + '/'}
          className="flex items-center gap-2 no-underline"
        >
          <img
            src={LOGO_SRC}
            alt={BRAND.name}
            className="h-20 w-auto object-contain"
          />
        </Link>

        {/* Menu Desktop */}
        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <NavLink href={link.href} isActive={isActive}>
                  {t[link.labelKey as keyof typeof t]}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Tombol, Dropdown Bahasa & Menu Mobile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dropdown Bahasa Desktop */}
          <div className="relative hidden md:block" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              className={cn(
                'flex items-center gap-2 py-2 px-3.5 rounded-full border text-xs sm:text-sm font-medium transition-colors',
                langOpen
                  ? 'border-ember bg-cocoa text-cream shadow-sm'
                  : 'border-cocoa/20 bg-cocoa/5 text-cocoa hover:border-ember'
              )}
              aria-expanded={langOpen}
              aria-label="Pilih Bahasa"
            >
              <svg className="w-4 h-4 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.6 9h16.8M3.6 15h16.8M11.5 3a17 17 0 000 18M12.5 3a17 17 0 010 18" />
              </svg>
              <span className="font-semibold uppercase">{selectedLang.code}</span>
              <svg
                className={cn('w-3.5 h-3.5 transition-transform duration-200', langOpen ? 'rotate-180' : '')}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: ease.out }}
                  className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-[#1c1815] text-cream shadow-xl border border-cocoa/20 overflow-hidden z-50 p-1.5"
                >
                  <div className="flex flex-col">
                    {LANGUAGES.map((lang) => {
                      const isSelected = selectedLang.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => handleSelectLanguage(lang)}
                          className={cn(
                            'flex items-center justify-between w-full p-3 rounded-xl text-left transition-colors',
                            isSelected ? 'bg-cocoa/60' : 'hover:bg-cocoa/30'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-ember tracking-wider w-6">
                              {lang.code}
                            </span>
                            <p className={cn('text-sm font-medium', isSelected ? 'text-ember font-semibold' : 'text-cream')}>
                              {lang.label}
                            </p>
                          </div>
                          {isSelected && (
                            <svg className="w-5 h-5 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tombol Reservasi */}
          <Link
            href="/kontak"
            className={cn(
              'hidden rounded-full bg-ember px-6 py-2.5 text-sm font-semibold text-cream md:inline-flex',
              'transition-[transform,background-color] duration-300 ease-smooth',
              'hover:-translate-y-0.5 hover:bg-ember-dark'
            )}
          >
            {t.reservation}
          </Link>

          {/* Tombol Menu Mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-full border border-blush md:hidden"
          >
            <span className="relative block h-4 w-5">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: duration.fast, ease: ease.inOut }}
                className="absolute inset-x-0 top-0 h-[2px] origin-center bg-ink"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: duration.fast, ease: ease.inOut }}
                className="absolute inset-x-0 top-2 h-[2px] bg-ink"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: duration.fast, ease: ease.inOut }}
                className="absolute inset-x-0 top-4 h-[2px] origin-center bg-ink"
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Menu Mobile */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: ease.inOut }}
            className="overflow-hidden border-t border-blush/50 bg-cream md:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        'block py-2.5 px-3 rounded-lg text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-ember/10 text-ember font-semibold'
                          : 'text-cocoa hover:text-ember'
                      )}
                    >
                      {t[link.labelKey as keyof typeof t]}
                    </Link>
                  </li>
                );
              })}
              
              {/* Pemilih Bahasa Mobile */}
              <li className="mt-3 pt-4 border-t border-blush/30">
                <div className="px-3">
                  <div className="flex bg-cocoa/5 p-1 rounded-full border border-cocoa/10">
                    {LANGUAGES.map((lang) => {
                      const isSelected = selectedLang.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            handleSelectLanguage(lang);
                            setMenuOpen(false);
                          }}
                          className={cn(
                            'flex-1 py-1.5 text-xs sm:text-sm rounded-full text-center transition-all duration-200',
                            isSelected
                              ? 'bg-cream shadow-sm text-ember font-bold'
                              : 'text-cocoa/70 hover:text-cocoa font-medium'
                          )}
                        >
                          {lang.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </li>
              
              <li className="mt-5">
                <Link
                  href="/kontak"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-full bg-ember px-6 py-2.5 text-center text-sm font-semibold text-cream"
                >
                  {t.reservation}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative text-sm font-medium transition-colors',
        isActive ? 'text-ember font-semibold' : 'text-cocoa hover:text-ember'
      )}
    >
      {children}
      <span
        className={cn(
          'absolute -bottom-1 left-0 h-[2px] w-full bg-ember transition-transform duration-300 ease-smooth',
          isActive ? 'scale-x-100' : 'scale-x-0 origin-left group-hover:scale-x-100'
        )}
      />
    </Link>
  );
}