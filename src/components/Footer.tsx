import React from 'react';
import { ActiveMenu } from '../types/index.ts';
import { MENU_ITEMS } from './Navigation.tsx';
import { ChevronLeft, ChevronRight, Home, LayoutDashboard } from 'lucide-react';

interface FooterProps {
  activeMenu: ActiveMenu;
  setActiveMenu: (menu: ActiveMenu) => void;
}

export const Footer: React.FC<FooterProps> = ({ activeMenu, setActiveMenu }) => {
  const currentIndex = MENU_ITEMS.findIndex((m) => m.id === activeMenu);
  const prevMenu = currentIndex > 0 ? MENU_ITEMS[currentIndex - 1] : null;
  const nextMenu = currentIndex < MENU_ITEMS.length - 1 ? MENU_ITEMS[currentIndex + 1] : null;

  return (
    <footer className="print:hidden bg-[#0c233c] text-white border-t border-cyan-900/40 py-4 px-4 sm:px-8 mt-12 transition-all">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Navigation Quick Step Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
          {prevMenu ? (
            <button
              onClick={() => setActiveMenu(prevMenu.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition"
              title={`Kembali ke ${prevMenu.shortLabel}`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya: {prevMenu.shortLabel}</span>
            </button>
          ) : (
            <div />
          )}

          {nextMenu && (
            <button
              onClick={() => setActiveMenu(nextMenu.id)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#168AAD] hover:bg-cyan-600 text-white text-xs font-bold shadow transition"
              title={`Lanjut ke ${nextMenu.shortLabel}`}
            >
              <span>Selanjutnya: {nextMenu.shortLabel}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Center / Copyright */}
        <div className="text-center text-[11px] text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} <strong className="text-slate-200">Smart Bio-Learning Environment (SBLE)</strong> • Tesis Magister Pendidikan Sains
          </p>
          <p className="text-[10px] text-slate-500">
            Bioteknologi Kearifan Lokal Lampung (Fermentasi Tempoyak Durian) • Rasio Acuan 16:9
          </p>
        </div>

        {/* Quick Shortcut Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveMenu('beranda')}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition"
          >
            <Home className="w-3.5 h-3.5 text-[#F4C95D]" />
            <span>Beranda</span>
          </button>
          <button
            onClick={() => setActiveMenu('dashboard')}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
