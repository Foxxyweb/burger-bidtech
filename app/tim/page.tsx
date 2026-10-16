'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: 'head-chef' | 'line-cook' | 'prep-station' | 'service-team';
  categoryLabel: string;
  image: string;
  badge?: string;
  bio: string;
  experience: string;
  specialty: string;
}

const ALL_TEAM_MEMBERS: TeamMember[] = [
  // --- KATEGORI 1: Staff Head Chef ---
  {
    id: '1',
    name: 'Chef Aris Budiman', // Sesuai foto laki-laki
    role: 'Kepala Koki Eksekutif',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    image: '/assets/staff/staff%201.webp',
    badge: 'Founder & Chef',
    bio: 'Pendiri sekaligus pengarah kuliner utama dengan pengalaman lebih dari 12 tahun di restoran internasional.',
    experience: '12+ Tahun',
    specialty: 'Executive Culinary & Fine Dining',
  },
  {
    id: '2',
    name: 'Chef Hendra Wijaya', // Sesuai foto laki-laki
    role: 'Senior Executive Chef',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    image: '/assets/staff/staff%202.webp',
    bio: 'Ahli dalam mengkurasi menu musiman dan memimpin operasional dapur secara menyeluruh.',
    experience: '10 Tahun',
    specialty: 'Modern European & Asian Fusion',
  },
  {
    id: '3',
    name: 'Chef Sarah Alatas', // Sesuai foto perempuan
    role: 'Co-Head Chef & R&D',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    image: '/assets/staff/staff%203.webp',
    bio: 'Fokus pada inovasi menu baru dan riset cita rasa autentik Nusantara berpadu modern.',
    experience: '9 Tahun',
    specialty: 'Recipe Development & Fusion',
  },
  {
    id: '4',
    name: 'Chef Maya Lestari', // Diubah menjadi perempuan sesuai foto
    role: 'Executive Sous Chef',
    category: 'head-chef',
    categoryLabel: 'Staff Head Chef',
    image: '/assets/staff/staff%204.webp',
    bio: 'Mengawasi kualitas seluruh hidangan yang keluar dari dapur utama setiap harinya.',
    experience: '11 Tahun',
    specialty: 'Kitchen Operations & Quality',
  },

  // --- KATEGORI 2: Staff Line Cook ---
  {
    id: '5',
    name: 'Chef Arya Saputra', // Diubah menjadi nama lokal (Laki-laki)
    role: 'Koki Lini Utama (Pastri)',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    image: '/assets/staff/staff%205.webp',
    bio: 'Bertanggung jawab atas kesempurnaan lini pembuatan makanan penutup dan pastri harian.',
    experience: '8 Tahun',
    specialty: 'Artisan Pastry & Baking',
  },
  {
    id: '6',
    name: 'Chef Budi Santoso', // Sesuai foto laki-laki
    role: 'Spesialis Grill & Daging',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    image: '/assets/staff/staff%2010.webp',
    bio: 'Spesialis dalam teknik pemanggangan tingkat presisi tinggi untuk menjaga keempukan daging.',
    experience: '7 Tahun',
    specialty: 'Grill Master & Steaks',
  },
  {
    id: '7',
    name: 'Chef Aldi Permana', // Diubah menjadi nama lokal (Laki-laki)
    role: 'Koki Lini Masak Panas',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    image: '/assets/staff/staff%207.webp',
    bio: 'Menangani hidangan utama dengan kecepatan dan konsistensi rasa yang luar biasa.',
    experience: '6 Tahun',
    specialty: 'Hot Kitchen & Main Course',
  },
  {
    id: '8',
    name: 'Chef Dika Pratama', // Sesuai foto laki-laki
    role: 'Line Cook Sauté & Sauce',
    category: 'line-cook',
    categoryLabel: 'Staff Line Cook',
    image: '/assets/staff/staff%208.webp',
    bio: 'Pakar racikan saus pendamping hidangan utama yang memperkuat cita rasa.',
    experience: '5 Tahun',
    specialty: 'Sauce Crafting & Sauté',
  },

  // --- KATEGORI 3: Staff Prep Station ---
  {
    id: '9',
    name: 'Sinta Rahmawati', // Diubah menjadi nama lokal (Perempuan sesuai foto)
    role: 'Kepala Bagian Bahan & Logistik',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    image: '/assets/staff/staff%209.webp',
    bio: 'Memastikan seluruh bahan organik dan bumbu segar pilihan langsung dari petani lokal.',
    experience: '5 Tahun',
    specialty: 'Ingredient Sourcing & QC',
  },
  {
    id: '10',
    name: 'Agus Setiawan', // Diubah menjadi nama lokal (Laki-laki)
    role: 'Staf Prep & Mise en Place',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    image: '/assets/staff/staff%206.webp',
    bio: 'Ahli dalam persiapan pemotongan bahan baku secara higienis dan terstandarisasi.',
    experience: '4 Tahun',
    specialty: 'Precision Cutting & Prep',
  },
  {
    id: '11',
    name: 'Fajar Nugroho', // Diubah menjadi nama lokal (Laki-laki)
    role: 'Staf Kontrol Kebersihan Dapur',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    image: '/assets/staff/staff%2011.webp',
    bio: 'Menjaga standar sterilitas dan kebersihan stasiun kerja dapur sesuai protokol kesehatan.',
    experience: '5 Tahun',
    specialty: 'Food Safety & Sanitation',
  },
  {
    id: '12',
    name: 'Rizky Ramadhan', // Diubah menjadi laki-laki sesuai foto (Sebelumnya Rina)
    role: 'Prep Station Assistant',
    category: 'prep-station',
    categoryLabel: 'Staff Prep Station',
    image: '/assets/staff/staff%2012.webp',
    bio: 'Menyiapkan bumbu dasar dan bahan mentah sebelum jam operasional dapur dimulai.',
    experience: '3 Tahun',
    specialty: 'Vegetable Prep & Spices',
  },

  // --- KATEGORI 4: Staff Service Team ---
  {
    id: '13',
    name: 'Ratna Kusuma', // Diubah menjadi nama lokal (Perempuan)
    role: 'Manajer Restoran & Layanan',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    image: '/assets/staff/staff%2013.webp',
    bio: 'Memimpin tim depan (front-of-house) untuk memberikan pengalaman pelayanan hospitality terbaik.',
    experience: '9 Tahun',
    specialty: 'Guest Relations & Management',
  },
  {
    id: '14',
    name: 'Bayu Saputro', // Diubah menjadi nama lokal (Laki-laki)
    role: 'Kepala Pelayan (Head Waitress)', // Role dibiarkan atau bisa diubah jadi Head Waiter
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    image: '/assets/staff/staff%2014.webp',
    bio: 'Siap menyambut tamu dengan kehangatan serta memberikan rekomendasi menu spesial.',
    experience: '5 Tahun',
    specialty: 'VIP Table Service',
  },
  {
    id: '15',
    name: 'Kartika Putri', // Diubah menjadi nama lokal (Perempuan)
    role: 'Staf Hubungan Tamu',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    image: '/assets/staff/staff%2015.webp',
    bio: 'Menangani reservasi khusus dan memastikan kenyamanan tamu selama berada di Chef Table.',
    experience: '4 Tahun',
    specialty: 'Event Hosting & Hospitality',
  },
  {
    id: '16',
    name: 'Dimas Anggara', // Sesuai foto laki-laki
    role: 'Professional Bartender & Server',
    category: 'service-team',
    categoryLabel: 'Staff Service Team',
    image: '/assets/staff/staff%2016.webp',
    bio: 'Meracik minuman segar pendamping hidangan serta memberikan pelayanan meja yang ramah.',
    experience: '5 Tahun',
    specialty: 'Beverage Crafting & FOH',
  },
];

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'head-chef' | 'line-cook' | 'prep-station' | 'service-team'
  >('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <Header />
      <main className="bg-white text-cocoa min-h-screen">

        {/* HERO SECTION */}
        <section className="section pt-36 md:pt-44 pb-12 bg-white border-b border-cocoa/10">
          <div className="shell text-center max-w-3xl mx-auto">
            <p className="eyebrow mb-3">GASTRONOMI AUTENTIK</p>
            <h1 className="heading text-4xl sm:text-6xl mb-6">
              Temui Tim Kreatif Kami
            </h1>
            <p className="text-base sm:text-lg text-cocoa/80 leading-relaxed font-light">
              Di balik kelezatan hidangan dan kehangatan suasana Chef Table, ada talenta-talenta hebat yang selalu bekerja penuh dedikasi untuk Anda.
            </p>
          </div>
        </section>

        {/* MAIN SECTION */}
        <section className="section bg-white pt-10">
          <div className="shell space-y-10">

            {/* TAB KATEGORI FILTER */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                Semua ({ALL_TEAM_MEMBERS.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('head-chef')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'head-chef'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                Staff Head Chef
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('line-cook')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'line-cook'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                Staff Line Cook
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('prep-station')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'prep-station'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                Staff Prep Station
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('service-team')}
                className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeFilter === 'service-team'
                    ? 'bg-ember text-cream shadow-md'
                    : 'text-cocoa hover:text-ember bg-gray-50 border border-cocoa/10'
                }`}
              >
                Staff Service Team
              </button>
            </div>

            {/* GRID ANGGOTA TIM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {ALL_TEAM_MEMBERS.map((member) => {
                const isVisible = activeFilter === 'all' || activeFilter === member.category;

                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`group bg-white rounded-3xl overflow-hidden border border-cocoa/15 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isVisible ? 'block' : 'hidden'
                    }`}
                  >
                    {/* Foto Aspect 4/5 */}
                    <div className="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden">
                      {member.badge && (
                        <div className="absolute top-3 left-3 z-10 bg-ember text-cream text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                          {member.badge}
                        </div>
                      )}
                      
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        priority
                        unoptimized
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>

                    {/* Informasi Ringkas */}
                    <div className="p-5 text-center flex-1 flex flex-col justify-between">
                      <div>
                        <p className="eyebrow mb-1 text-[10px] text-ember">{member.categoryLabel}</p>
                        <h3 className="heading text-lg mb-1 group-hover:text-ember transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-cocoa/70 text-xs font-medium">{member.role}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-cocoa/10">
                        <span className="text-xs font-semibold text-ember group-hover:underline inline-flex items-center gap-1">
                          Lihat Selengkapnya &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* MODAL POPUP LIHAT SELENGKAPNYA */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-cocoa/10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/70 hover:bg-black text-white rounded-full flex items-center justify-center transition-colors text-xs font-bold cursor-pointer"
              >
                ✕
              </button>

              <div className="relative w-full aspect-[4/3] bg-gray-100">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="eyebrow mb-1 text-ember">{selectedMember.categoryLabel}</p>
                  <h3 className="heading text-2xl mb-0.5">{selectedMember.name}</h3>
                  <p className="text-cocoa/70 text-sm font-medium">{selectedMember.role}</p>
                </div>

                <p className="text-cocoa text-sm leading-relaxed">
                  {selectedMember.bio}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cocoa/10">
                  <div>
                    <p className="eyebrow text-[10px]">Pengalaman</p>
                    <p className="heading text-sm">{selectedMember.experience}</p>
                  </div>
                  <div>
                    <p className="eyebrow text-[10px]">Spesialisasi</p>
                    <p className="heading text-sm">{selectedMember.specialty}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="w-full mt-2 py-3 bg-ember text-cream font-semibold text-sm rounded-full hover:bg-ember/90 transition-colors cursor-pointer"
                >
                  Tutup Profil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CALL TO ACTION */}
        <CTA />

      </main>
      <Footer />
    </>
  );
}