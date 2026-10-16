'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';

const MENU_CATEGORIES = [
  { key: 'semua', label: 'Semua' },
  { key: 'burger', label: 'Burger' },
  { key: 'taco', label: 'Taco' },
  { key: 'wrap', label: 'Wrap' },
  { key: 'minuman', label: 'Minuman' },
];

const MENU_ITEMS = [
  { id: 1, slug: 'burger-spesial', name: 'Burger Spesial', category: 'burger', price: 75000, description: 'Daging sapi pilihan dengan bawang bombay...', image: '/assets/menu/burger-special.webp', popular: true },
  { id: 2, slug: 'burger-cheese', name: 'Burger Cheese', category: 'burger', price: 50000, description: 'Daging sapi panggang premium, lelehan keju...', image: '/assets/menu/burger-cheese.webp', popular: false },
  { id: 3, slug: 'burger-beef', name: 'Burger Beef', category: 'burger', price: 65000, description: 'Patty sapi premium dengan selada renyah...', image: '/assets/menu/burger-beef.webp', popular: false },
  { id: 4, slug: 'taco-al-pastor', name: 'Taco Al Pastor', category: 'taco', price: 60000, description: 'Babi panggang lambat dengan nanas panggang,...', image: '/assets/menu/taco-al-pastor.webp', popular: false },
  { id: 5, slug: 'taco-veggie', name: 'Veggie Taco', category: 'taco', price: 70000, description: 'Veggie Taco kami dibuat dengan tortilla...', image: '/assets/menu/taco-veggie.webp', popular: false },
  { id: 6, slug: 'taco-mexican', name: 'Mexican Taco', category: 'taco', price: 50000, description: 'Isian daging melimpah, siraman saus...', image: '/assets/menu/taco-mexican.webp', popular: false },
  { id: 7, slug: 'wrap-ayam-gurih', name: 'Wrap Ayam Gurih', category: 'wrap', price: 40000, description: 'Ayam herbal panggang dengan alpukat Hass,...', image: '/assets/menu/wrap-ayam-gurih.webp', popular: false },
  { id: 8, slug: 'wrap-italian', name: 'Italian Wrap', category: 'wrap', price: 35000, description: 'Perpaduan sempurna antara daging...', image: '/assets/menu/wrap-italian.webp', popular: false },
  { id: 9, slug: 'wrap-roast-beef', name: 'Roast Beef Wrap', category: 'wrap', price: 60000, description: 'Slice daging sapi panggang super juicy...', image: '/assets/menu/wrap-beef.webp', popular: false },
  { id: 10, slug: 'soda-jeruk-khas', name: 'Soda Jeruk Khas', category: 'minuman', price: 30000, description: 'Dibuat sendiri dengan bahan segar...', image: '/assets/menu/soda-jeruk-khas.webp', popular: false },
  { id: 11, slug: 'cola', name: 'Cola', category: 'minuman', price: 20000, description: 'Minuman soda kola legendaris...', image: '/assets/menu/cola.webp', popular: false },
  { id: 12, slug: 'es-teh', name: 'Es Teh', category: 'minuman', price: 15000, description: 'Seduhan teh pilihan dengan rasa manis...', image: '/assets/menu/es-teh.webp', popular: false },
];

const formatPrice = (amount: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

const getPreviewItem = (category: string) =>
  MENU_ITEMS.find(item => item.category === category && item.popular) ||
  MENU_ITEMS.find(item => item.category === category);

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('semua');
  
  // State untuk buka/tutup menu kategori di versi mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const listYangTampil = activeCategory === 'semua'
    ? [
        { key: 'semua', label: 'SEMUA', items: [
          getPreviewItem('burger'),
          getPreviewItem('taco'),
          getPreviewItem('wrap'),
          getPreviewItem('minuman'),
        ].filter(Boolean) },
        { key: 'burger', label: 'BURGER', items: MENU_ITEMS.filter(i => i.category === 'burger') },
        { key: 'taco', label: 'TACO', items: MENU_ITEMS.filter(i => i.category === 'taco') },
        { key: 'wrap', label: 'WRAP', items: MENU_ITEMS.filter(i => i.category === 'wrap') },
        { key: 'minuman', label: 'MINUMAN', items: MENU_ITEMS.filter(i => i.category === 'minuman') },
      ]
    : [
        { key: activeCategory, label: activeCategory.toUpperCase(), items: MENU_ITEMS.filter(i => i.category === activeCategory) }
      ];

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">
        <section className="section pt-32 md:pt-44 pb-16 bg-white">
          <div className="shell">
            {/* PERUBAHAN DI SINI: Mengubah gap-12 menjadi gap-6 di mobile, lalu md:gap-12 untuk desktop */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              
              {/* SIDEBAR KATEGORI */}
              <aside className="w-full md:w-44 flex-shrink-0 md:sticky md:top-28">
                <Reveal>
                  
                  {/* Tombol Toggle "All Menu" (Khusus Mobile, di Desktop non-aktif) */}
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    // Mengurangi margin-bottom (mb-4 menjadi mb-2) di mobile agar lebih merapat
                    className="flex items-center justify-between w-full md:w-auto gap-2 mb-2 md:mb-4 font-bold text-sm text-ink cursor-pointer md:cursor-default md:pointer-events-none"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-ember" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <span>All Menu</span>
                    </div>
                    {/* Ikon panah (Hanya terlihat di Mobile) */}
                    <svg
                      className={`w-4 h-4 text-cocoa transition-transform duration-300 md:hidden ${
                        isMobileMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Wrapper Kategori: Buka/Tutup di mobile, selalu tampil di desktop */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out md:max-h-full md:opacity-100 ${
                      isMobileMenuOpen ? 'max-h-[500px] opacity-100 mb-2 md:mb-6' : 'max-h-0 opacity-0 md:mb-0'
                    }`}
                  >
                    <nav className="flex flex-wrap md:flex-col gap-2 pb-2 md:pb-0">
                      {MENU_CATEGORIES.map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => {
                            setActiveCategory(cat.key);
                            setIsMobileMenuOpen(false); // Otomatis tutup kategori setelah dipilih
                          }}
                          className={`text-left px-3 py-1.5 text-sm transition-all duration-200 whitespace-nowrap rounded-lg cursor-pointer ${
                            activeCategory === cat.key
                              ? 'font-bold text-ember bg-ember/10 border border-transparent'
                              : 'text-cocoa/70 hover:text-ink hover:bg-gray-50 border border-gray-200 md:border-transparent'
                          }`}
                        >
                          {activeCategory === cat.key && <span className="mr-1.5 text-xs text-ember">▸</span>}
                          {cat.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                </Reveal>
              </aside>

              {/* KONTEN UTAMA MENU */}
              <div className="flex-1 w-full mt-2 md:mt-0">
                {listYangTampil.map((group) => (
                  <div key={group.key} className="mb-16 md:mb-20 last:mb-0">
                    
                    {/* Judul Pembatas Kategori */}
                    <Reveal>
                      <h2 className="heading text-xl md:text-3xl uppercase tracking-wider mb-6 md:mb-8 text-ink">
                        {group.label}
                      </h2>
                    </Reveal>

                    {/* Grid Menu */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {group.items.map((item) => (
                        <Reveal key={item!.id}>
                          <div className="group flex flex-col h-full bg-white rounded-3xl p-4 border border-cocoa/15 shadow-xs hover:shadow-xl transition-all duration-300">
                            <Link
                              href={`/menu/${item!.slug}`}
                              className="flex flex-col flex-grow no-underline"
                            >
                              {/* Gambar Menu */}
                              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-4">
                                <Image
                                  src={item!.image}
                                  alt={item!.name}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {item!.popular && (
                                  <span className="absolute top-3 right-3 bg-ember text-cream text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                                    Populer
                                  </span>
                                )}
                              </div>

                              {/* Nama & Deskripsi */}
                              <h3 className="heading text-lg mb-1 group-hover:text-ember transition-colors text-ink">
                                {item!.name}
                              </h3>
                              <p className="text-xs text-cocoa/70 leading-relaxed mb-4 flex-grow line-clamp-2">
                                {item!.description}
                              </p>
                            </Link>
                            
                            {/* Tombol Harga */}
                            <Link
                              href={`/menu/${item!.slug}`}
                              className="w-full py-2.5 rounded-full text-xs font-semibold text-center block transition-all duration-300 border border-ember text-ember hover:bg-ember hover:text-cream"
                            >
                              {formatPrice(item!.price)}
                            </Link>
                          </div>
                        </Reveal>
                      ))}
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export { MENU_ITEMS, formatPrice };