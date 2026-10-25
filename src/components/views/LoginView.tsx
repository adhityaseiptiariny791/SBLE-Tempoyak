import React, { useState } from 'react';
import { UserAccount, UserRole } from '../../types/index.ts';
import { authenticateUser } from '../../utils/authStore.ts';
import { 
  Lock, 
  User, 
  GraduationCap, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Info, 
  AlertCircle,
  Eye,
  EyeOff,
  BookOpen,
  FlaskConical,
  KeyRound
} from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: (user: UserAccount) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [roleTab, setRoleTab] = useState<UserRole>('siswa');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Harap masukkan Username/NISN dan Kata Sandi.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const user = authenticateUser(username, password);
      setIsSubmitting(false);

      if (!user) {
        setErrorMessage('Username/NISN atau kata sandi tidak sesuai. Silakan periksa kembali.');
        return;
      }

      onLoginSuccess(user);
    }, 300);
  };

  const handleQuickLogin = (u: string, p: string, r: UserRole) => {
    setRoleTab(r);
    setUsername(u);
    setPassword(p);
    setErrorMessage(null);

    const user = authenticateUser(u, p);
    if (user) {
      onLoginSuccess(user);
    }
  };

  return (
    <div className="min-h-screen bg-[#07192c] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#168AAD]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#2E8B57]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#123B67]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Brand Presentation & Local Context */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F4C95D]" />
            Tesis Magister Pendidikan Sains
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/10 p-2 border border-white/20 shadow-2xl backdrop-blur-md flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src="/assets/aistudio/Logo_SBLE__Belajar_dan_Berinovasi_5eeda7a9.png" 
                alt="Logo SBLE" 
                className="w-full h-full object-contain filter drop-shadow"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Smart Bio-Learning <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C95D] via-amber-200 to-white">
                  Environment (SBLE)
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-cyan-200 font-medium mt-1">
                Bioteknologi Kearifan Lokal Lampung: Fermentasi Tempoyak Durian
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
            Platform pembelajaran digital interaktif IPA SMP berbasis <em>Deep Learning</em> untuk meningkatkan kemampuan berpikir kritis dan sikap ilmiah melalui eksplorasi virtual fermentasi pangan tradisional.
          </p>

          {/* Highlights feature pills */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0 text-left">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <FlaskConical className="w-4 h-4 text-amber-400" /> Virtual Laboratory
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Simulasi kinetika pH, kadar garam, dan mikroba BAL secara dinamis.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <GraduationCap className="w-4 h-4 text-emerald-400" /> Portal Guru Terpadu
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Pantau progres belajar, kelola akun siswa, dan isi observasi sikap.
              </p>
            </div>
          </div>
        </div>

        {/* Right Col: Login Form Card */}
        <div className="lg:col-span-6">
          <div className="rounded-3xl bg-slate-900/90 border border-cyan-800/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            {/* Role Switcher Tabs */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-950 border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => {
                  setRoleTab('siswa');
                  setErrorMessage(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  roleTab === 'siswa'
                    ? 'bg-[#168AAD] text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Masuk Siswa</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRoleTab('guru');
                  setErrorMessage(null);
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  roleTab === 'guru'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Guru Pengampu</span>
              </button>
            </div>

            {/* Form Title */}
            <div className="mb-5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {roleTab === 'siswa' ? (
                  <>
                    <User className="w-5 h-5 text-[#168AAD]" />
                    <span>Akses Pembelajaran Siswa</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-5 h-5 text-[#F4C95D]" />
                    <span>Portal Guru Pengampu & Pengelola Akun</span>
                  </>
                )}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {roleTab === 'siswa'
                  ? 'Gunakan NISN atau username yang diberikan oleh guru pengampumu.'
                  : 'Akses khusus pendidik untuk memantau kemajuan belajar dan menerbitkan akun siswa.'}
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Actual Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {roleTab === 'siswa' ? 'Nomor Induk Siswa Nasional (NISN) / Username:' : 'Username Guru / NIP:'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={roleTab === 'siswa' ? 'Contoh: 0081234567' : 'Contoh: guru.adhitya'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#168AAD] focus:border-transparent transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Kata Sandi (Password):
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan kata sandi..."
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#168AAD] focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                    title={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 ${
                  roleTab === 'siswa'
                    ? 'bg-gradient-to-r from-[#168AAD] to-[#2E8B57] hover:from-cyan-600 hover:to-emerald-600 text-white'
                    : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black'
                }`}
              >
                <span>{isSubmitting ? 'Memeriksa Kredensial...' : roleTab === 'siswa' ? 'Masuk ke Lingkungan Belajar SBLE' : 'Masuk ke Portal Guru Pengampu'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Demo Logins Section */}
            <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold flex items-center gap-1.5 text-cyan-300">
                  <KeyRound className="w-3.5 h-3.5" /> Akses Cepat Demo (Satu Klik):
                </span>
                <span className="text-[10px] text-slate-400">Untuk Pengujian & Riset</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Quick Guru Login */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('guru.adhitya', 'guru123', 'guru')}
                  className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 border border-amber-600/50 text-left transition text-xs group"
                >
                  <div className="font-bold text-amber-300 flex items-center justify-between">
                    <span>👩‍🏫 Guru Pengampu</span>
                    <span className="text-[10px] opacity-70 group-hover:opacity-100">Klik &rarr;</span>
                  </div>
                  <div className="text-[10px] text-slate-300 truncate">Adhitya Seiptiariny, S.Pd.</div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">U: guru.adhitya • P: guru123</div>
                </button>

                {/* Quick Siswa 1 */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('0081234567', 'siswa123', 'siswa')}
                  className="p-2.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-600/50 text-left transition text-xs group"
                >
                  <div className="font-bold text-cyan-300 flex items-center justify-between">
                    <span>👨‍🎓 Siswa 1 (Ahmad Fauzan)</span>
                    <span className="text-[10px] opacity-70 group-hover:opacity-100">Klik &rarr;</span>
                  </div>
                  <div className="text-[10px] text-slate-300">Kelas IX-A (Progres 73%)</div>
                  <div className="text-[9px] text-slate-400 font-mono mt-0.5">NISN: 0081234567 • P: siswa123</div>
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('0087654321', 'siswa123', 'siswa')}
                  className="text-[11px] text-slate-400 hover:text-cyan-300 transition"
                >
                  Atau coba akun siswa lain: <strong className="text-cyan-200">Siti Nurhaliza (Progres 100%)</strong> &rarr;
                </button>
              </div>
            </div>

            {/* Local Storage Disclaimer */}
            <div className="mt-4 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2E8B57]" />
              <span>Data sesi tersimpan secara lokal dan aman di peramban ini.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
