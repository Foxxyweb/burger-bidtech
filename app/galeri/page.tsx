'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';

const GALLERY_IMAGES = [
  { id: 1, src: '/assets/gallery/burger-closeup.webp', alt: 'Burger Spesial' },
  { id: 2, src: '/assets/gallery/taco-table.webp', alt: 'Taco Tiga Rasa' },
  { id: 3, src: '/assets/gallery/wrap-board.webp', alt: 'Wrap Gandum Panggang' },
  { id: 4, src: '/assets/gallery/sandwich-platter.webp', alt: 'Sandwich Platter' },
  { id: 5, src: '/assets/gallery/events-seasonal-menu.webp', alt: 'Menu Musiman' },
  { id: 6, src: '/assets/gallery/interior-bar-counter.webp', alt: 'Meja Bar' },
  { id: 7, src: '/assets/gallery/interior-corner-table.webp', alt: 'Sudut Tenang' },
  { id: 8, src: '/assets/gallery/interior-main-dining.webp', alt: 'Ruang Makan Utama' },
  { id: 9, src: '/assets/gallery/interior-open-kitchen.webp', alt: 'Dapur Terbuka' },
  { id: 10, src: '/assets/gallery/events-catering-table.webp', alt: 'Meja Katering' },
  { id: 11, src: '/assets/gallery/events-private-dinner.webp', alt: 'Makan Malam Pribadi' },
  { id: 12, src: '/assets/gallery/events-shared-table.webp', alt: 'Meja Bersama' },
  { id: 13, src: '/assets/gallery/staff-head-chef.webp', alt: 'Kepala Koki' },
  { id: 14, src: '/assets/gallery/staff-line-cook.webp', alt: 'Koki Utama' },
  { id: 15, src: '/assets/gallery/staff-prep-station.webp', alt: 'Persiapan Bahan' },
  { id: 16, src: '/assets/gallery/staff-service-team.webp', alt: 'Tim Pelayanan' },
];

export default function GaleriPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(GALLERY_IMAGES.length / itemsPerPage);

  const displayImages = GALLERY_IMAGES.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect();
      scrollPosRef.current = rect.top + window.scrollY;
    }
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    requestAnimationFrame(() => {
      if (scrollPosRef.current) {
        window.scrollTo({ top: scrollPosRef.current, behavior: 'instant' });
      }
    });
  };

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">
        
        {/* HERO / JUDUL GALERI */}
        <section className="section pt-36 md:pt-44 pb-12 bg-white">
          <div className="shell text-center max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-3">
                Koleksi Kami
              </p>
              <h1 className="heading text-4xl sm:text-5xl md:text-6xl mb-6 text-ink">
                Galeri Momen & Kelezatan
              </h1>
              <p className="text-base md:text-lg text-cocoa/80 max-w-xl mx-auto leading-relaxed font-light">
                Jelajahi kehangatan ruang makan, kesegaran bahan pilihan, dan dedikasi tim kami dalam menyajikan hidangan istimewa untuk Anda.
              </p>
            </Reveal>
          </div>
        </section>

        {/* GRID GALERI (Kembali menggunakan max-w-5xl agar ukurannya pas & proporsional) */}
        <section ref={galleryRef} className="section pb-24 pt-0 bg-white">
          <div className="shell max-w-5xl">
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 min-h-[340px] md:min-h-[420px]">
                {displayImages.map((item) => (
                  <div
                    key={item.id}
                    className="relative w-full aspect-square overflow-hidden rounded-2xl cursor-pointer
                               transition-all duration-300 ease-out
                               hover:-translate-y-2 hover:shadow-xl active:translate-y-0 bg-cocoa/5"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Tombol Navigasi Halaman */}
            <div className="flex justify-center items-center mt-12 gap-3">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
                className="text-cocoa/40 hover:text-ember text-lg transition-colors disabled:opacity-30 disabled:hover:text-cocoa/40 cursor-pointer"
              >
                ‹
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`w-8 h-8 rounded-full text-sm transition-all cursor-pointer ${
                    page === num
                      ? 'bg-ember text-cream font-bold'
                      : 'text-cocoa/60 hover:text-ember hover:bg-ember/10 font-medium'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="text-cocoa/40 hover:text-ember text-lg transition-colors disabled:opacity-30 disabled:hover:text-cocoa/40 cursor-pointer"
              >
                ›
              </button>
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