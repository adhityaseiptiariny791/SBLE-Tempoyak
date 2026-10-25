import React from 'react';
import { ActiveMenu } from '../../types/index.ts';
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Mail, 
  School, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  Atom,
  Info
} from 'lucide-react';

interface ProfilPengembangViewProps {
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const ProfilPengembangView: React.FC<ProfilPengembangViewProps> = ({ setActiveMenu }) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#123B67] via-[#103054] to-[#168AAD] text-white p-6 shadow-lg border border-cyan-400/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <GraduationCap className="w-6 h-6 text-[#F4C95D]" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-200 uppercase tracking-wider">
              Tesis Magister Pendidikan Sains
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">Profil Pengembang & Konteks Riset</h1>
            <p className="text-xs sm:text-sm text-cyan-100">
              Pengembangan Media Smart Bio-Learning Environment (SBLE)
            </p>
          </div>
        </div>
      </div>

      {/* Thesis Title Card */}
      <div className="rounded-2xl bg-white p-6 shadow-md border-l-4 border-[#168AAD] space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-cyan-100 text-[#168AAD] uppercase tracking-wider">
          Judul Tesis Magister Pendidikan Sains
        </span>
        <h2 className="text-lg sm:text-xl font-extrabold text-[#123B67] leading-snug">
          “Pengembangan Smart Bio-Learning Environment Berbasis Deep Learning pada Materi Bioteknologi Konteks Tempoyak untuk Meningkatkan Berpikir Kritis dan Sikap Ilmiah Siswa SMP”
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
          Penelitian ini bertujuan untuk merancang, menguji kelayakan, kepraktisan, dan efektivitas lingkungan belajar digital <strong>Smart Bio-Learning Environment (SBLE)</strong> yang mengintegrasikan fenomena autentik kearifan lokal Lampung (fermentasi tempoyak durian) dengan laboratorium virtual interaktif untuk menumbuhkan keterampilan berpikir kritis (Facione & Ennis) dan sikap ilmiah siswa SMP.
        </p>
      </div>

      {/* Developer & Supervisory Identity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Peneliti / Pengembang */}
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-cyan-100 border border-cyan-300 flex items-center justify-center text-[#168AAD] font-black text-lg">
              AS
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#123B67]">Adhitya Seiptiariny, S.Pd.</h3>
              <p className="text-xs text-slate-500 font-medium">SMPN Satu Atap 4 Tulang Bawang Barat</p>
              <p className="text-xs text-cyan-700 font-semibold">Guru IPA SMP • Peneliti Tesis Pendidikan Sains</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#168AAD]" />
              <span className="font-mono text-[11px]">adhityaseiptiariny79@guru.smp.belajar.id</span>
            </div>
            <div className="flex items-center gap-2">
              <School className="w-4 h-4 text-[#2E8B57]" />
              <span>SMPN Satu Atap 4 Tulang Bawang Barat • Magister Pendidikan Sains</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cyan-50 text-[11px] text-[#123B67] leading-relaxed">
            Didedikasikan untuk memajukan pendidikan sains Indonesia melalui digitalisasi kearifan lokal nusantara yang mendalam, bermakna, dan menyenangkan bagi generasi masa depan.
          </div>
        </div>

        {/* Tim Pembimbing & Validasi Ahli */}
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
          <h3 className="text-sm font-extrabold text-[#123B67] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2E8B57]" />
            Validasi Ahli & Dewan Pembimbing
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Produk multimedia SBLE dikembangkan melalui tahapan validasi multi-disiplin:
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Validasi Materi Bioteknologi & Kearifan Lokal:</strong> Memastikan ketepatan konsep biokimia fermentasi asam laktat, peran BAL, dan akurasi konteks pangan Lampung.
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Validasi Media & Pembelajaran Digital:</strong> Memastikan kelayakan antarmuka 16:9, kemudahan navigasi, responsivitas, dan interaktivitas simulasi.
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Uji Keterbacaan & Pengguna Siswa SMP:</strong> Menjamin bahasa yang baku, komunikatif, ramah siswa, dan menstimulasi rasa ingin tahu sains.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific & AI Disclaimer */}
      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 space-y-2 text-xs text-amber-900">
        <div className="font-extrabold flex items-center gap-1.5 text-amber-800">
          <Info className="w-4 h-4" /> Pernyataan Transparansi Akademik & Sains:
        </div>
        <p className="leading-relaxed">
          1. <strong>Model Simulasi Komputasi:</strong> Angka pH, laju akumulasi asam laktat, dan biomasa BAL pada Virtual Laboratory didasarkan pada model matematis kinetika reaksi fermentasi edukatif, bukan pengganti uji basah laboratorium kuantitatif.<br />
          2. <strong>Penyimpanan Data Lokal:</strong> Seluruh progres, jurnal uji laboratorium, dan jawaban evaluasi disimpan pada penyimpanan lokal peramban (browser localStorage) untuk menjaga kemudahan akses siswa tanpa memerlukan akun berbayar.
        </p>
      </div>
    </div>
  );
};
