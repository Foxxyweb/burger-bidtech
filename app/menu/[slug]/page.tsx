'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';
import { MENU_ITEMS, formatPrice } from '@/lib/constants';

type MenuItem = (typeof MENU_ITEMS)[number] & {
  slug: string;
  popular?: boolean;
};

type ExtraOption = {
  id: string;
  name: string;
  price: number;
};

const EXTRA_OPTIONS: Record<
  string,
  {
    title: string;
    options: ExtraOption[];
  }
> = {
  Burger: {
    title: 'Pilih Saus',
    options: [
      { id: 'standar', name: 'Saus Rahasia', price: 0 },
      { id: 'keju', name: 'Saus Keju Leleh', price: 10000 },
      { id: 'tartar', name: 'Saus Tartar', price: 8000 },
      { id: 'pedas', name: 'Saus Pedas Khas', price: 8000 },
    ],
  },

  Taco: {
    title: 'Pilih Saus',
    options: [
      { id: 'salsa', name: 'Salsa Segar', price: 0 },
      { id: 'keju', name: 'Saus Keju Krim', price: 10000 },
      { id: 'pedas', name: 'Saus Cabai Api', price: 8000 },
      { id: 'krim', name: 'Krim Asam', price: 8000 },
    ],
  },

  Wrap: {
    title: 'Pilih Saus',
    options: [
      { id: 'standar', name: 'Saus Rumahan', price: 0 },
      { id: 'mayones', name: 'Mayones Bawang Putih', price: 8000 },
      { id: 'yogurt', name: 'Saus Yogurt Herbal', price: 10000 },
      { id: 'pedas', name: 'Saus Sambal Lembut', price: 8000 },
    ],
  },

  Minuman: {
    title: 'Tambahan Minuman',
    options: [
      { id: 'standar', name: 'Standar', price: 0 },
      { id: 'gula', name: 'Tambah Gula', price: 3000 },
      { id: 'es', name: 'Tambah Es Batu', price: 3000 },
      { id: 'ukuran', name: 'Besar (+20%)', price: 8000 },
    ],
  },
};

export default function DetailProdukPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [qty, setQty] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([
    'standar',
  ]);

  const produk = (
    MENU_ITEMS.find((item) => item.slug === slug) ||
    MENU_ITEMS[0]
  ) as MenuItem;

  const menuLainnya = MENU_ITEMS.filter(
    (item) => item.slug !== slug
  ) as MenuItem[];

  const category = produk.category;

  const categoryLabel =
    category.charAt(0).toUpperCase() + category.slice(1);

  const extraConfig = EXTRA_OPTIONS[categoryLabel] || {
    title: 'Pilihan Tambahan',
    options: [
      {
        id: 'standar',
        name: 'Standar',
        price: 0,
      },
    ],
  };

  /*
   * Hitung total semua tambahan yang dipilih.
   * "Standar" tidak menambah harga.
   */
  const extraPrice = extraConfig.options
    .filter(
      (option) =>
        selectedExtras.includes(option.id) &&
        option.id !== 'standar'
    )
    .reduce(
      (total, option) => total + option.price,
      0
    );

  const totalPrice =
    (produk.price + extraPrice) * qty;

  /*
   * Fungsi pilih / batal tambahan
   */
  const toggleExtra = (option: ExtraOption) => {
    setSelectedExtras((current) => {
      // Jika pilih Standar, semua tambahan lain dibatalkan.
      if (option.id === 'standar') {
        return ['standar'];
      }

      // Hilangkan Standar jika memilih tambahan lain.
      const currentWithoutStandard = current.filter(
        (id) => id !== 'standar'
      );

      // Kalau sudah dipilih, klik lagi untuk membatalkan.
      if (currentWithoutStandard.includes(option.id)) {
        const updated = currentWithoutStandard.filter(
          (id) => id !== option.id
        );

        // Kalau tidak ada tambahan sama sekali, kembali ke Standar.
        return updated.length > 0
          ? updated
          : ['standar'];
      }

      // Tambahkan pilihan baru.
      return [
        ...currentWithoutStandard,
        option.id,
      ];
    });
  };

  // Fungsi mengarahkan pesanan langsung ke WhatsApp
  const handleWhatsAppOrder = () => {
    const activeExtrasNames = extraConfig.options
      .filter((opt) => selectedExtras.includes(opt.id))
      .map((opt) => opt.name)
      .join(', ');

    const phoneNumber = '6282376680987';
    const message = `Halo Chef's Table, saya ingin memesan:\n\n*${produk.name}* (x${qty})\n- Kategori: ${categoryLabel}\n- Pilihan Tambahan: ${activeExtrasNames}\n- Total Harga: ${formatPrice(totalPrice)}\n\nMohon konfirmasi pemesanan saya. Terima kasih!`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-white text-cocoa">
        <section className="section pt-36 md:pt-44 pb-16 bg-white">
          <div className="shell max-w-5xl">

            {/* Kembali ke Menu */}
            <Reveal>
              <Link
                href="/menu"
                className="inline-flex items-center gap-1 text-sm font-semibold mb-8 text-ember hover:text-ink transition-colors"
              >
                ← Kembali ke Menu
              </Link>
            </Reveal>

            {/* Bagian Utama Detail Produk */}
            <div className="grid md:grid-cols-2 gap-10 items-start">

              {/* Gambar Produk */}
              <Reveal>
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-sm bg-gray-100 group">
                  <Image
                    src={produk.image}
                    alt={produk.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                  />

                  {produk.popular && (
                    <span className="absolute top-4 left-4 bg-ember text-cream text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                      Populer
                    </span>
                  )}
                </div>
              </Reveal>

              {/* Informasi Produk */}
              <Reveal>
                <div className="flex flex-col py-2">

                  <span className="eyebrow mb-2 text-ember">
                    {produk.category}
                  </span>

                  <h1 className="heading text-3xl md:text-4xl mb-3 text-ink">
                    {produk.name}
                  </h1>

                  <p className="heading text-2xl mb-4 text-ember">
                    {formatPrice(produk.price)}
                  </p>

                  <p className="text-cocoa/80 text-sm md:text-base leading-relaxed mb-6 font-light">
                    {produk.description}
                  </p>

                  {/* Pilihan Tambahan */}
                  <div className="bg-cream/40 rounded-2xl p-5 mb-6 border border-cocoa/10">

                    <div className="flex items-center justify-between mb-3">
                      <h3 className="heading text-sm text-ink">
                        {extraConfig.title}
                      </h3>

                      <span className="text-xs text-cocoa/60">
                        Bisa pilih beberapa
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {extraConfig.options.map((opt) => {
                        const isSelected =
                          selectedExtras.includes(opt.id);

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleExtra(opt)}
                            className={`p-3 rounded-xl text-left text-xs sm:text-sm transition-all cursor-pointer border ${
                              isSelected
                                ? 'bg-ember text-cream border-ember shadow-xs'
                                : 'bg-white text-cocoa border-cocoa/15 hover:border-ember/50'
                            }`}
                          >
                            <span className="flex items-center gap-2 font-medium">

                              {/* Checkbox */}
                              <span
                                className={`flex items-center justify-center rounded border shrink-0 w-4 h-4 text-[10px] ${
                                  isSelected
                                    ? 'bg-cream text-ember border-cream font-bold'
                                    : 'bg-transparent text-ember border-ember'
                                }`}
                              >
                                {isSelected ? '✓' : ''}
                              </span>

                              {opt.name}

                            </span>

                            <span className={`text-[11px] mt-1.5 block ${isSelected ? 'text-cream/90' : 'text-cocoa/70'}`}>
                              {opt.price > 0
                                ? `+ ${formatPrice(opt.price)}`
                                : 'Termasuk'}
                            </span>

                          </button>
                        );
                      })}
                    </div>

                    {/* Total Tambahan */}
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-cocoa/10">
                      <span className="text-xs text-cocoa/70">
                        Total tambahan
                      </span>

                      <span className="text-sm font-bold text-ember">
                        {formatPrice(extraPrice)}
                      </span>
                    </div>

                  </div>

                  {/* Jumlah dan Tombol Pesan WhatsApp */}
                  <div className="flex items-center gap-4">

                    {/* Quantity */}
                    <div className="flex items-center bg-gray-100 rounded-full p-1 border border-cocoa/10">

                      <button
                        type="button"
                        onClick={() =>
                          setQty((q) => Math.max(1, q - 1))
                        }
                        className="w-9 h-9 rounded-full font-bold text-ink hover:bg-white transition-colors cursor-pointer flex items-center justify-center"
                      >
                        −
                      </button>

                      <span className="w-8 text-center font-bold text-ink text-sm">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQty((q) => q + 1)}
                        className="w-9 h-9 rounded-full font-bold text-ink hover:bg-white transition-colors cursor-pointer flex items-center justify-center"
                      >
                        +
                      </button>

                    </div>

                    {/* Tombol Pesan WhatsApp */}
                    <button
                      type="button"
                      onClick={handleWhatsAppOrder}
                      className="flex-1 py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-cream bg-ember hover:bg-ember/90 transition-all cursor-pointer shadow-sm text-center"
                    >
                      Pesan — {formatPrice(totalPrice)}
                    </button>

                  </div>

                </div>
              </Reveal>

            </div>

            {/* Anda Mungkin Juga Suka */}
            {menuLainnya.length > 0 && (
              <section className="mt-20 space-y-8 pt-8 border-t border-cocoa/10">
                <Reveal>
                  <h2 className="heading text-2xl md:text-3xl text-center text-ink">
                    Anda Mungkin Juga Suka
                  </h2>
                </Reveal>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {menuLainnya.slice(0, 6).map((item) => (
                    <Reveal key={item.slug}>
                      <Link
                        href={`/menu/${item.slug}`}
                        className="group bg-white rounded-2xl overflow-hidden shadow-xs border border-cocoa/15 transition-all hover:shadow-md block"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-400 group-hover:scale-105"
                          />

                          {item.popular && (
                            <span className="absolute top-3 left-3 bg-ember text-cream text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                              Populer
                            </span>
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="heading text-base mb-1 group-hover:text-ember transition-colors">
                            {item.name}
                          </h3>

                          <p className="text-sm font-semibold text-ember">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

          </div>
        </section>

        {/* CALL TO ACTION */}
        <CTA />

      </main>

      <Footer />
    </>
  );
}