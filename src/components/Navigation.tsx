import React from 'react';
import { ActiveMenu } from '../types/index.ts';
import {
  Home,
  HelpCircle,
  Target,
  Sparkles,
  HelpCircle as QuestionIcon,
  BookOpen,
  Compass,
  FlaskConical,
  BarChart3,
  Brain,
  HeartHandshake,
  CheckSquare,
  Smile,
  LayoutDashboard,
  GraduationCap,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface NavigationProps {
  activeMenu: ActiveMenu;
  setActiveMenu: (menu: ActiveMenu) => void;
  completedMenus: Set<ActiveMenu>;
}

export interface MenuItem {
  id: ActiveMenu;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  phase: string;
  color: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'beranda', label: '1. Beranda', shortLabel: 'Beranda', icon: Home, phase: 'Orientasi', color: '#168AAD' },
  { id: 'petunjuk', label: '2. Petunjuk Penggunaan', shortLabel: 'Petunjuk', icon: HelpCircle, phase: 'Orientasi', color: '#168AAD' },
  { id: 'capaian', label: '3. Capaian & Tujuan', shortLabel: 'Capaian', icon: Target, phase: 'Orientasi', color: '#168AAD' },
  { id: 'fenomena', label: '4. Fenomena Lokal', shortLabel: 'Fenomena', icon: Sparkles, phase: 'Orientasi', color: '#F4C95D' },
  { id: 'masalah', label: '5. Orientasi Masalah', shortLabel: 'Masalah', icon: QuestionIcon, phase: 'Orientasi', color: '#F4C95D' },
  { id: 'materi', label: '6. Materi Bioteknologi', shortLabel: 'Materi', icon: BookOpen, phase: 'Orientasi', color: '#2E8B57' },
  { id: 'investigasi', label: '7. Investigasi Ilmiah', shortLabel: 'Investigasi', icon: Compass, phase: 'Laboratorium', color: '#2E8B57' },
  { id: 'virtuallab', label: '8. Virtual Laboratory', shortLabel: 'Virtual Lab', icon: FlaskConical, phase: 'Laboratorium', color: '#168AAD' },
  { id: 'analisis', label: '9. Analisis Data', shortLabel: 'Analisis', icon: BarChart3, phase: 'Laboratorium', color: '#168AAD' },
  { id: 'berpikir-kritis', label: '10. Berpikir Kritis', shortLabel: 'Berpikir Kritis', icon: Brain, phase: 'Asesmen', color: '#F4C95D' },
  { id: 'sikap-ilmiah', label: '11. Sikap Ilmiah', shortLabel: 'Sikap Ilmiah', icon: HeartHandshake, phase: 'Asesmen', color: '#2E8B57' },
  { id: 'evaluasi', label: '12. Evaluasi', shortLabel: 'Evaluasi', icon: CheckSquare, phase: 'Asesmen', color: '#168AAD' },
  { id: 'refleksi', label: '13. Refleksi Belajar', shortLabel: 'Refleksi', icon: Smile, phase: 'Refleksi', color: '#2E8B57' },
  { id: 'dashboard', label: '14. Dashboard Siswa', shortLabel: 'Dashboard', icon: LayoutDashboard, phase: 'Refleksi', color: '#168AAD' },
  { id: 'profil', label: '15. Profil Pengembang', shortLabel: 'Profil', icon: GraduationCap, phase: 'Refleksi', color: '#F4C95D' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeMenu,
  setActiveMenu,
  completedMenus,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scrollNav = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-[#0e2c4d] border-b border-cyan-900/40 sticky top-[61px] sm:top-[68px] z-30 shadow-md">
      <div className="max-w-[1920px] mx-auto px-2 sm:px-4 py-1.5 flex items-center gap-1 sm:gap-2">
        {/* Left Arrow */}
        <button
          onClick={() => scrollNav('left')}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors shrink-0"
          title="Geser menu ke kiri"
          aria-label="Scroll menu kiri"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Nav Container */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            const isCompleted = completedMenus.has(item.id);

            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 border ${
                  isActive
                    ? 'bg-[#168AAD] text-white border-cyan-300 shadow-md scale-[1.02]'
                    : isCompleted
                    ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700/50 hover:bg-emerald-900/50'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/40 hover:bg-slate-800/80 hover:text-white'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon 
                  className={`w-3.5 h-3.5 ${
                    isActive ? 'text-[#F4C95D]' : isCompleted ? 'text-emerald-400' : 'text-slate-400'
                  }`} 
                />
                <span>{item.shortLabel}</span>
                {isCompleted && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" title="Sudah dieksplorasi" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollNav('right')}
          className="p-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors shrink-0"
          title="Geser menu ke kanan"
          aria-label="Scroll menu kanan"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
