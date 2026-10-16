'use client';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { useMemo, useState } from 'react';
import { MENU_FILTERS, MENU_ITEMS, formatPrice } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { duration, ease, fadeUp, spring, staggerParent } from '@/lib/motion';
import { Reveal } from '@/components/motion/Reveal';
import { SplitWords } from '@/components/motion/SplitWords';

const C_PRIMARY = '#9E3B2B';

type MenuFilter = (typeof MENU_FILTERS)[number];
type MenuItem = (typeof MENU_ITEMS)[number] & { slug: string };

// ✅ DIUBAH: Sekarang 4 saja per halaman
const PAGE_SIZE = 4;

export default function Menu() {
  const reduce = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<MenuFilter>('Semua');
  const [page, setPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (activeFilter === 'Semua') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const visibleItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  function chooseFilter(filter: MenuFilter) {
    setActiveFilter(filter);
    setPage(1);
  }

  return (
    <section id="menu" className="py-10 bg-[#fffdf8]">
      <div className="shell">
        {/* Judul & Filter */}
        <div className="mb-8 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <Reveal>
              <p className="eyebrow mb-2 font-medium tracking-widest text-sm" style={{ color: C_PRIMARY }}>
                PILIHAN MUSIMAN
              </p>
            </Reveal>
            <SplitWords
              as="h2"
              text="Dari Dapur Kami"
              className="heading text-3xl sm:text-4xl font-bold text-gray-900"
            />
          </div>
          <Reveal delay={0.12}>
            <LayoutGroup id="menu-filter-tabs">
              <div
                role="tablist"
                aria-label="Filter kategori menu"
                className="flex flex-wrap gap-2.5 justify-start md:justify-end"
              >
                {MENU_FILTERS.map((filter) => {
                  const active = filter === activeFilter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => chooseFilter(filter)}
                      className={cn(
                        'relative h-9 px-5 rounded-full text-sm font-medium transition-all duration-300',
                        active
                          ? 'text-white shadow-lg'
                          : 'bg-transparent text-gray-600 hover:text-gray-900'
                      )}
                      style={active ? { backgroundColor: C_PRIMARY, boxShadow: `0 10px 15px -3px ${C_PRIMARY}20` } : {}}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-menu-filter"
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: C_PRIMARY }}
                          transition={spring.soft}
                        />
                      )}
                      <span className="relative">{filter}</span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>

        {/* Grid Kartu Menu — ✅ Tetap 4 kolom, isinya 4 saja */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeFilter}-${page}`}
            variants={reduce ? undefined : staggerParent(0.08)}
            initial={reduce ? false : 'hidden'}
            animate={reduce ? undefined : 'show'}
            exit={
              reduce
                ? undefined
                : { opacity: 0, y: 8, transition: { duration: 0.2 } }
            }
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {visibleItems.length > 0 ? (
              visibleItems.map((item) => (
                <MenuCard key={item.slug} item={item as MenuItem} reduce={Boolean(reduce)} />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-gray-500">
                Belum ada menu untuk kategori ini.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Paginasi — muncul kalau lebih dari 4 */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2">
            <PaginationButton
              label="Halaman sebelumnya"
              disabled={page === 1}
              onClick={() => setPage((c) => Math.max(1, c - 1))}
            >
              &lsaquo;
            </PaginationButton>
            {pages.map((n) => (
              <PaginationButton
                key={n}
                label={`Halaman ${n}`}
                active={n === page}
                onClick={() => setPage(n)}
              >
                {n}
              </PaginationButton>
            ))}
            <PaginationButton
              label="Halaman berikutnya"
              disabled={page === totalPages}
              onClick={() => setPage((c) => Math.min(totalPages, c + 1))}
            >
              &rsaquo;
            </PaginationButton>
          </nav>
        )}
      </div>
    </section>
  );
}

function MenuCard({ item, reduce }: { item: MenuItem; reduce: boolean }) {
  return (
    <Link href={`/menu/${item.slug}`} className="block cursor-pointer">
      <motion.article
        layout
        variants={reduce ? undefined : fadeUp}
        whileHover={reduce ? undefined : { y: -4 }}
        transition={spring.soft}
        className="group bg-white rounded-2xl overflow-hidden border border-[#f8e7e0] transition-all duration-300 hover:shadow-md"
      >
        {/* Gambar */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#fff3ed]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {item.badge && (
            <span
              className="absolute right-3 top-3 text-white px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ backgroundColor: C_PRIMARY }}
            >
              {item.badge}
            </span>
          )}
        </div>
        {/* Isi Kartu */}
        <div className="p-4">
          <h3 className="font-bold text-base mb-1 text-gray-900 group-hover:text-[#9E3B2B] transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5rem]">
            {item.description}
          </p>
          {/* Harga */}
          <div className="w-full py-2 border border-[#f0d9cf] rounded-full text-center group-hover:border-[#9E3B2B]/30 transition-colors">
            <span className="font-semibold text-sm text-gray-900">
              {formatPrice(item.price)}
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

function PaginationButton({
  active = false,
  disabled = false,
  label,
  children,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'w-9 h-9 rounded-full text-sm font-medium transition-all',
        active ? 'text-white' : 'bg-white text-gray-500 hover:bg-red-50',
        disabled && 'opacity-30 cursor-not-allowed'
      )}
      style={active ? { backgroundColor: C_PRIMARY } : {}}
    >
      {children}
    </button>
  );
}