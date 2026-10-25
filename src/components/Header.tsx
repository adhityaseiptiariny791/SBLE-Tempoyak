import React from 'react';
import { ActiveMenu, StudentProfile, UserAccount } from '../types/index.ts';
import { 
  BookOpen, 
  Sparkles, 
  User, 
  Award, 
  CheckCircle2, 
  Maximize2, 
  Minimize2, 
  LogOut, 
  GraduationCap,
  LayoutDashboard
} from 'lucide-react';

interface HeaderProps {
  activeMenu: ActiveMenu;
  setActiveMenu: (menu: ActiveMenu) => void;
  student: StudentProfile;
  progressPercent: number;
  completedCount: number;
  totalModules: number;
  is16x9Fixed: boolean;
  setIs16x9Fixed: (val: boolean) => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
  onReturnToTeacherDashboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeMenu,
  setActiveMenu,
  student,
  progressPercent,
  completedCount,
  totalModules,
  is16x9Fixed,
  setIs16x9Fixed,
  currentUser,
  onLogout,
  onReturnToTeacherDashboard,
}) => {
  const isTeacher = currentUser?.role === 'guru';

  return (
    <header className="bg-[#123B67] text-white border-b border-[#168AAD]/40 shadow-lg sticky top-0 z-40 select-none">
      <div className="max-w-[1920px] mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Logo Section */}
        <div 
          onClick={() => setActiveMenu('beranda')}
          className="flex items-center gap-3 cursor-pointer group transition-all"
          title="Kembali ke Beranda"
        >
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20 group-hover:border-[#F4C95D] transition-colors shadow-inner overflow-hidden">
            <img 
              src="/assets/aistudio/Logo_SBLE__Belajar_dan_Berinovasi_5eeda7a9.png" 
              alt="Logo SBLE" 
              className="w-full h-full object-contain filter drop-shadow"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#F4C95D] transition-colors flex items-center gap-1.5">
                SBLE
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-[#168AAD]/30 border border-[#168AAD] text-cyan-200 uppercase tracking-widest hidden md:inline-block">
                  IPA SMP • Kearifan Lokal Lampung
                </span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-300 font-medium truncate max-w-[200px] sm:max-w-md">
              Smart Bio-Learning Environment • Fermentasi Tempoyak Durian Khas Lampung
            </p>
          </div>
        </div>

        {/* Center / Progress Tracker */}
        <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl">
          <div className="text-right">
            <div className="flex items-center justify-end gap-1.5 text-xs font-semibold text-slate-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57]" />
              Progres Belajar: <span className="text-[#F4C95D] font-bold">{progressPercent}%</span>
            </div>
            <div className="text-[10px] text-slate-300">
              {completedCount} dari {totalModules} Menu Selesai
            </div>
          </div>
          <div className="w-28 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-[#2E8B57] via-[#168AAD] to-[#F4C95D] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Right Section: Teacher Return, Student Badge, 16:9, Logout */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* If teacher in student preview, show return button */}
          {isTeacher && onReturnToTeacherDashboard && (
            <button
              onClick={onReturnToTeacherDashboard}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all animate-pulse"
              title="Kembali ke Dashboard Guru Pengampu"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kembali ke Portal Guru</span>
            </button>
          )}

          {/* Aspect Ratio Toggle */}
          <button
            onClick={() => setIs16x9Fixed(!is16x9Fixed)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              is16x9Fixed 
                ? 'bg-[#168AAD] text-white border-cyan-300 shadow-sm' 
                : 'bg-white/10 text-slate-200 border-white/20 hover:bg-white/20'
            }`}
            title="Kunci Rasio Layar 16:9 untuk Pengalaman Belajar Optimal"
            aria-label="Toggle frame 16:9"
          >
            {is16x9Fixed ? <Minimize2 className="w-3.5 h-3.5 text-[#F4C95D]" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>16:9 {is16x9Fixed ? 'Aktif' : 'Adaptif'}</span>
          </button>

          {/* User Profile Badge */}
          <button
            onClick={() => setActiveMenu('dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-left text-xs"
            title="Buka Profil & Portofolio"
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold shadow-sm ${
              isTeacher 
                ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-slate-950' 
                : 'bg-gradient-to-tr from-[#168AAD] to-[#2E8B57]'
            }`}>
              {isTeacher ? <GraduationCap className="w-4 h-4 text-slate-950" /> : <User className="w-4 h-4" />}
            </div>
            <div className="hidden sm:block">
              <div className="font-semibold text-slate-100 max-w-[110px] truncate leading-tight">
                {student.name || (isTeacher ? currentUser?.name : 'Siswa SMP')}
              </div>
              <div className={`text-[10px] font-semibold ${isTeacher ? 'text-amber-300' : 'text-cyan-300'}`}>
                {isTeacher ? 'GURU PENGAMPU' : (student.className || 'Kelas IX IPA')}
              </div>
            </div>
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-800/40 text-rose-300 hover:text-white transition"
            title="Keluar dari Akun"
            aria-label="Keluar akun"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
