'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import { Reveal } from '@/components/motion/Reveal';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        
        {/* ========== SECTION HUBUNGI KAMI ========== */}
        <section className="section pt-36 md:pt-44 pb-20 bg-white">
          <div className="shell">
            <Reveal>
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                
                {/* KOLOM KIRI: Teks & Peta Lokasi (Seperti Foto Referensi Hijau) */}
                <div className="space-y-6">
                  <div>
                    <span className="eyebrow mb-3 block">HUBUNGI KAMI</span>
                    <h1 className="heading text-3xl md:text-4xl lg:text-5xl mb-4 text-ink">
                      Mari Berbincang dengan Kami
                    </h1>
                    <p className="text-cocoa/80 text-base leading-relaxed mb-6">
                      Punya pertanyaan seputar menu, reservasi, atau ingin pesan untuk acara spesial? Kami siap membantu!
                    </p>
                    
                    {/* Tombol Call */}
                    <a
                      href="tel:082376680987"
                      className="inline-flex items-center justify-center py-3 px-6 border border-ember text-ember rounded-full font-medium text-center hover:bg-ember hover:text-white transition-colors duration-200 text-sm"
                    >
                      Call (0823–7668–0987)
                    </a>
                  </div>

                  {/* Card Peta Lokasi di Kiri */}
                  <div className="bg-white p-4 sm:p-5 rounded-2xl border border-cocoa/10 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-ember text-xs">LOKASI KAMI</span>
                      <span className="text-xs text-cocoa/60">Pagedangan, Banten</span>
                    </div>
                    <div className="w-full h-72 sm:h-80 rounded-xl overflow-hidden shadow-xs border border-cocoa/10">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126686.000000000002!2d106.55!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6fb28888888889%3A0x123456789abcde!2sPagedangan%2C+Banten!5e0!3m2!1sid!2sid!4v1728123456789!5m2!1sid!2sid"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Peta Lokasi Chef's Table"
                      />
                    </div>
                  </div>
                </div>

                {/* KOLOM KANAN: Formulir Pesan & Jam Operasional di Bawahnya */}
                <div className="space-y-6">
                  {/* Kotak Kirim Pesan */}
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-cocoa/10 shadow-sm space-y-5">
                    <div>
                      <h3 className="heading text-xl mb-1 text-ink">Kirim Pesan</h3>
                      <p className="text-xs text-cocoa/70">Isi formulir di bawah dan tim kami akan segera menghubungi Anda.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-cocoa/70 mb-1.5">
                          Nama Lengkap
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Masukkan nama lengkap..."
                          className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-lg text-sm text-ink placeholder:text-cocoa/40 focus:outline-none focus:border-ember transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-cocoa/70 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Alamat Email"
                          className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-lg text-sm text-ink placeholder:text-cocoa/40 focus:outline-none focus:border-ember transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-xs font-medium text-cocoa/70 mb-1.5">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="whatsapp"
                        placeholder="Nomor Telepon / WhatsApp"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-lg text-sm text-ink placeholder:text-cocoa/40 focus:outline-none focus:border-ember transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-cocoa/70 mb-1.5">
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Masukkan Pesan Anda..."
                        className="w-full px-4 py-2.5 bg-gray-50 border border-cocoa/15 rounded-lg text-sm text-ink placeholder:text-cocoa/40 resize-none focus:outline-none focus:border-ember transition-colors"
                      />
                    </div>
                    
                    {/* Tombol Kirim */}
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-ember text-white rounded-lg font-medium hover:bg-ember/90 transition-colors duration-200 shadow-sm cursor-pointer"
                    >
                      KIRIM PESAN
                    </button>
                  </div>

                  {/* Jam Operasional & Alamat ditarok di BAWAH Kotak Pesan */}
                  <div className="bg-white p-6 sm:p-7 rounded-2xl border border-cocoa/10 shadow-sm space-y-4">
                    <div>
                      <span className="eyebrow mb-1 block">TEMUI KAMI</span>
                      <h3 className="heading text-lg text-ink">Lokasi & Jam Operasional</h3>
                    </div>

                    <div className="text-xs text-cocoa/80 space-y-1 pb-3 border-b border-cocoa/10">
                      <p className="font-semibold text-ink text-sm mb-0.5">Alamat</p>
                      <p>Jl. Pemuda, Cijantra, Kec. Pagedangan, Banten 15336</p>
                    </div>

                    <div className="space-y-2 text-xs text-cocoa/80 pt-1">
                      <p className="font-semibold text-ink text-sm mb-1">Jam Operasional</p>
                      <div className="flex justify-between pb-1 border-b border-cocoa/5">
                        <span>Senin – Kamis</span>
                        <span className="font-medium text-ink">11.00 – 22.00</span>
                      </div>
                      <div className="flex justify-between pb-1 border-b border-cocoa/5">
                        <span>Jumat – Sabtu</span>
                        <span className="font-medium text-ink">11.00 – 00.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Minggu</span>
                        <span className="font-medium text-ink">10.00 – 21.00</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </Reveal>
          </div>
        </section>

        {/* ========== CALL TO ACTION ========== */}
        <CTA />

      </main>
      <Footer />
    </>
  );
}