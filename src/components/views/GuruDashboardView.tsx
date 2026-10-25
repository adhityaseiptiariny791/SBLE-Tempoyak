import React, { useState } from 'react';
import { 
  UserAccount, 
  StudentLearningData, 
  ScientificAttitudeTeacherObservation,
  ActiveMenu 
} from '../../types/index.ts';
import { 
  loadAccounts, 
  addStudentAccount, 
  updateTeacherObservationForStudent, 
  resetStudentPassword, 
  deleteStudentAccount 
} from '../../utils/authStore.ts';
import { SIKAP_ILMIAH_INDICATORS } from '../../data/learningContent.ts';
import { 
  GraduationCap, 
  Users, 
  UserPlus, 
  BarChart3, 
  CheckCircle2, 
  Search, 
  Filter, 
  Eye, 
  Key, 
  Trash2, 
  Save, 
  Printer, 
  Sparkles, 
  FlaskConical, 
  Brain, 
  HeartHandshake, 
  CheckSquare, 
  X, 
  Copy, 
  ArrowRight,
  ShieldAlert,
  Award,
  BookOpen
} from 'lucide-react';

interface GuruDashboardViewProps {
  currentUser: UserAccount;
  onLogout: () => void;
  onEnterStudentMode: (studentAccount?: UserAccount) => void;
}

export const GuruDashboardView: React.FC<GuruDashboardViewProps> = ({
  currentUser,
  onLogout,
  onEnterStudentMode,
}) => {
  const [activeTab, setActiveTab] = useState<'monitoring' | 'input-siswa' | 'penilaian-sikap' | 'daftar-kartu-akun'>('monitoring');
  const [accounts, setAccounts] = useState<UserAccount[]>(() => loadAccounts());
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState('Semua');

  // New Student Form State
  const [newName, setNewName] = useState('');
  const [newNisn, setNewNisn] = useState('');
  const [newClass, setNewClass] = useState('Kelas IX-A');
  const [newSchool, setNewSchool] = useState(currentUser.school || 'SMPN Satu Atap 4 Tulang Bawang Barat');
  const [newPassword, setNewPassword] = useState('siswa123');
  const [formSuccessMessage, setFormSuccessMessage] = useState<string | null>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

  // Modal State for Individual Student Details
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<UserAccount | null>(null);

  // Modal State for Grading Scientific Attitude
  const [gradingStudent, setGradingStudent] = useState<UserAccount | null>(null);
  const [tempObservation, setTempObservation] = useState<ScientificAttitudeTeacherObservation>({
    curiosity: 3,
    accuracy: 3,
    objectivity: 3,
    openness: 3,
    honesty: 4,
    responsibility: 3,
    teacherName: currentUser.name,
    notes: '',
  });
  const [gradeSaveSuccess, setGradeSaveSuccess] = useState(false);

  // Refresh accounts from store
  const refreshAccounts = () => {
    const list = loadAccounts();
    setAccounts(list);
  };

  const studentAccounts = accounts.filter((a) => a.role === 'siswa');

  // Filter students
  const filteredStudents = studentAccounts.filter((s) => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.nisn && s.nisn.includes(searchQuery));
    const matchesClass = classFilter === 'Semua' || s.className === classFilter;
    return matchesSearch && matchesClass;
  });

  // Calculate aggregates
  const totalStudents = studentAccounts.length;
  const avgProgress = totalStudents > 0
    ? Math.round(studentAccounts.reduce((acc, s) => acc + (s.studentData?.progressPercent || 0), 0) / totalStudents)
    : 0;
  
  const avgCriticalThinking = totalStudents > 0
    ? (studentAccounts.reduce((acc, s) => {
        const ctScores = s.studentData?.criticalThinkingScores || {};
        const correct = Object.values(ctScores).filter((x) => x.isCorrect).length;
        return acc + correct;
      }, 0) / totalStudents).toFixed(1)
    : '0';

  const avgEvaluation = totalStudents > 0
    ? Math.round(studentAccounts.reduce((acc, s) => {
        const evScores = s.studentData?.evaluationScores || {};
        const correct = Object.values(evScores).filter((x) => x.isCorrect).length;
        return acc + (correct * 10);
      }, 0) / totalStudents)
    : 0;

  // Handle Add Student
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrorMessage(null);
    setFormSuccessMessage(null);

    try {
      const created = addStudentAccount({
        name: newName,
        nisn: newNisn,
        className: newClass,
        school: newSchool,
        password: newPassword,
      });

      refreshAccounts();
      setFormSuccessMessage(`Akun siswa berhasil dibuat! Username: ${created.username} | Password: ${created.password}`);
      setNewName('');
      setNewNisn('');
      setTimeout(() => setFormSuccessMessage(null), 5000);
    } catch (err: any) {
      setFormErrorMessage(err.message || 'Gagal menambahkan siswa.');
    }
  };

  // Open Grading Modal
  const handleOpenGrading = (student: UserAccount) => {
    setGradingStudent(student);
    if (student.studentData?.teacherObservation) {
      setTempObservation({
        ...student.studentData.teacherObservation,
        teacherName: currentUser.name,
      });
    } else {
      setTempObservation({
        curiosity: 3,
        accuracy: 3,
        objectivity: 3,
        openness: 3,
        honesty: 4,
        responsibility: 3,
        teacherName: currentUser.name,
        notes: '',
      });
    }
    setGradeSaveSuccess(false);
  };

  const handleSaveObservation = () => {
    if (!gradingStudent) return;
    updateTeacherObservationForStudent(gradingStudent.id, tempObservation);
    refreshAccounts();
    setGradeSaveSuccess(true);
    setTimeout(() => {
      setGradeSaveSuccess(false);
      setGradingStudent(null);
    }, 1200);
  };

  const handleResetPassword = (studentId: string, studentName: string) => {
    const newPass = prompt(`Masukkan kata sandi baru untuk ${studentName}:`, 'siswa123');
    if (newPass && newPass.trim()) {
      resetStudentPassword(studentId, newPass.trim());
      refreshAccounts();
      alert(`Kata sandi ${studentName} berhasil diperbarui menjadi: ${newPass.trim()}`);
    }
  };

  const handleDelete = (studentId: string, studentName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus akun siswa "${studentName}"? Data riwayat belajarnya akan dihapus.`)) {
      deleteStudentAccount(studentId);
      refreshAccounts();
    }
  };

  const availableClasses = ['Semua', ...Array.from(new Set(studentAccounts.map((s) => s.className || 'Kelas IX-A')))];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#123B67] via-[#0d2a4a] to-[#168AAD] text-white p-6 sm:p-8 shadow-2xl border border-cyan-400/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F4C95D] to-amber-600 p-1 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <GraduationCap className="w-10 h-10 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 tracking-wider">
                  Portal Guru Pengampu
                </span>
                <span className="text-xs text-cyan-200">
                  NIP: {currentUser.nip || '-'}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
                {currentUser.name}
              </h1>
              <p className="text-xs text-slate-200">
                {currentUser.school} • Fasilitator Pembelajaran Bioteknologi Kearifan Lokal Lampung
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onEnterStudentMode()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2E8B57] to-[#168AAD] hover:from-emerald-600 hover:to-cyan-600 text-white font-bold text-xs shadow-lg transition-all"
              title="Buka tampilan belajar siswa sebagai pratinjau materi & virtual lab"
            >
              <Eye className="w-4 h-4 text-[#F4C95D]" />
              <span>Pratinjau Ruang Belajar Siswa</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-bold transition"
            >
              <span>Keluar Akun</span>
            </button>
          </div>
        </div>

        {/* Aggregate Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-cyan-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#F4C95D]" /> Total Siswa
            </div>
            <div className="text-2xl font-black text-white mt-1">{totalStudents} Siswa</div>
            <div className="text-[10px] text-slate-300">Terdaftar di platform</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-emerald-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-emerald-400" /> Rata-rata Progres
            </div>
            <div className="text-2xl font-black text-emerald-300 mt-1">{avgProgress}%</div>
            <div className="text-[10px] text-slate-300">Penyelesaian modul</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-amber-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-[#F4C95D]" /> Berpikir Kritis
            </div>
            <div className="text-2xl font-black text-[#F4C95D] mt-1">{avgCriticalThinking}/6</div>
            <div className="text-[10px] text-slate-300">Rata-rata skor benar</div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-[11px] text-cyan-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5 text-cyan-400" /> Rata-rata Evaluasi
            </div>
            <div className="text-2xl font-black text-white mt-1">{avgEvaluation}/100</div>
            <div className="text-[10px] text-slate-300">Hasil tes pemahaman</div>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation for Teacher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/60 border border-slate-800 rounded-2xl">
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'monitoring'
              ? 'bg-[#168AAD] text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#F4C95D]" />
          <span>1. Pemantauan Progres Siswa ({totalStudents})</span>
        </button>

        <button
          onClick={() => setActiveTab('input-siswa')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'input-siswa'
              ? 'bg-[#168AAD] text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <UserPlus className="w-4 h-4 text-emerald-400" />
          <span>2. Input & Terbitkan Akun Siswa</span>
        </button>

        <button
          onClick={() => setActiveTab('daftar-kartu-akun')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'daftar-kartu-akun'
              ? 'bg-[#168AAD] text-white shadow-md'
              : 'text-slate-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <Printer className="w-4 h-4 text-amber-300" />
          <span>3. Daftar & Cetak Kredensial Siswa</span>
        </button>
      </div>

      {/* TAB 1: PEMANTAUAN PROGRES SISWA */}
      {activeTab === 'monitoring' && (
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#168AAD]" />
                Rekapitulasi Kemajuan Belajar Siswa
              </h2>
              <p className="text-xs text-slate-500">
                Pantau kemajuan setiap siswa secara langsung, periksa nilai berpikir kritis, dan input observasi sikap ilmiah.
              </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama atau NISN..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#168AAD]"
                />
              </div>

              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="text-xs py-1.5 px-3 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#168AAD]"
              >
                {availableClasses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Students Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-[#123B67] text-white">
                <tr>
                  <th className="p-3">Nama Siswa</th>
                  <th className="p-3">NISN / Akun</th>
                  <th className="p-3">Kelas</th>
                  <th className="p-3">Progres</th>
                  <th className="p-3 text-center">Berpikir Kritis</th>
                  <th className="p-3 text-center">Evaluasi IPA</th>
                  <th className="p-3 text-center">Praktikum Lab</th>
                  <th className="p-3 text-center">Sikap Ilmiah (Guru)</th>
                  <th className="p-3 text-center">Aksi Guru</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-slate-50">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="p-8 text-center text-slate-500">
                      Tidak ditemukan data siswa dengan kriteria pencarian tersebut.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const data = student.studentData;
                    const progress = data?.progressPercent || 0;
                    const ctCorrect = Object.values(data?.criticalThinkingScores || {}).filter((x) => x.isCorrect).length;
                    const evalCorrect = Object.values(data?.evaluationScores || {}).filter((x) => x.isCorrect).length;
                    const trialsCount = data?.trials?.length || 0;
                    const obs = data?.teacherObservation;
                    const teacherRatingAvg = obs
                      ? ((obs.curiosity + obs.accuracy + obs.objectivity + obs.openness + obs.honesty + obs.responsibility) / 6).toFixed(1)
                      : 'Belum Dinilai';

                    return (
                      <tr key={student.id} className="hover:bg-white transition-colors">
                        <td className="p-3 font-bold text-slate-900">
                          {student.name}
                        </td>
                        <td className="p-3 font-mono text-slate-600">
                          {student.username}
                        </td>
                        <td className="p-3 font-semibold text-slate-700">
                          {student.className}
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#2E8B57] to-[#168AAD] rounded-full"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className="font-extrabold text-[#123B67]">{progress}%</span>
                          </div>
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold">
                            {ctCorrect}/6
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-extrabold ${
                            evalCorrect >= 7 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {evalCorrect * 10}/100
                          </span>
                        </td>
                        <td className="p-3 text-center font-bold text-[#168AAD]">
                          {trialsCount} Uji
                        </td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold">
                            {teacherRatingAvg} / 4.0
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* View Full Portfolio */}
                            <button
                              onClick={() => setSelectedStudentForModal(student)}
                              className="p-1.5 rounded-lg bg-cyan-100 hover:bg-cyan-200 text-[#168AAD] transition"
                              title="Lihat Detail Portofolio & Rapor Siswa"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            {/* Grade Scientific Attitude */}
                            <button
                              onClick={() => handleOpenGrading(student)}
                              className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-[#2E8B57] transition"
                              title="Input Lembar Observasi Sikap Ilmiah"
                            >
                              <HeartHandshake className="w-4 h-4" />
                            </button>

                            {/* Reset Password */}
                            <button
                              onClick={() => handleResetPassword(student.id, student.name)}
                              className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-800 transition"
                              title="Reset Kata Sandi Siswa"
                            >
                              <Key className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => handleDelete(student.id, student.name)}
                              className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 transition"
                              title="Hapus Akun Siswa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: INPUT & TERBITKAN AKUN SISWA */}
      {activeTab === 'input-siswa' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
            <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-[#168AAD]" />
              Formulir Pendaftaran Akun Siswa
            </h2>
            <p className="text-xs text-slate-500">
              Guru dapat mendaftarkan siswa secara individual. Akun akan langsung aktif dan dapat digunakan siswa untuk masuk ke SBLE.
            </p>

            {formSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-start gap-2 border border-emerald-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{formSuccessMessage}</span>
              </div>
            )}

            {formErrorMessage && (
              <div className="p-3 rounded-xl bg-rose-100 text-rose-900 text-xs font-semibold flex items-start gap-2 border border-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{formErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleAddStudent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nama Lengkap Siswa:
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Rian Hidayat"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Nomor Induk Siswa Nasional (NISN) / Username Login:
                </label>
                <input
                  type="text"
                  value={newNisn}
                  onChange={(e) => setNewNisn(e.target.value)}
                  placeholder="Contoh: 0081122334"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Kelas:
                  </label>
                  <input
                    type="text"
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    placeholder="Kelas IX-A"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Kata Sandi Awal:
                  </label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="siswa123"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Asal Sekolah:
                </label>
                <input
                  type="text"
                  value={newSchool}
                  onChange={(e) => setNewSchool(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#168AAD] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#168AAD] hover:bg-cyan-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Terbitkan Akun Siswa Baru</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-[#123B67]">
                Daftar Akun yang Baru Didaftarkan ({studentAccounts.length} Siswa)
              </h3>
              <button
                onClick={() => setActiveTab('daftar-kartu-akun')}
                className="text-xs text-[#168AAD] hover:underline font-bold"
              >
                Lihat Format Cetak Kartu &rarr;
              </button>
            </div>

            <div className="space-y-2 max-h-[440px] overflow-y-auto">
              {studentAccounts.map((student) => (
                <div key={student.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{student.name}</div>
                    <div className="text-[11px] text-slate-500">
                      {student.className} • {student.school}
                    </div>
                    <div className="text-[10px] font-mono text-[#168AAD] mt-0.5">
                      Username / NISN: <span className="font-bold">{student.username}</span> • Password: <span className="font-bold">{student.password}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onEnterStudentMode(student)}
                    className="px-3 py-1.5 rounded-lg bg-[#2E8B57] hover:bg-emerald-700 text-white font-bold text-[11px] shadow transition"
                    title="Buka sebagai siswa ini"
                  >
                    Masuk Sebagai Siswa
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DAFTAR KARTU KREDENSIAL AKUN (PRINTABLE) */}
      {activeTab === 'daftar-kartu-akun' && (
        <div className="rounded-2xl bg-white p-6 shadow-md border border-slate-200 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-extrabold text-[#123B67] flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#168AAD]" />
                Kartu Akses Login Siswa SBLE (Siap Cetak / Bagikan)
              </h2>
              <p className="text-xs text-slate-500">
                Cetak atau bagikan kredensial berikut kepada masing-masing siswa untuk login ke media pembelajaran.
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs shadow hover:bg-black transition"
            >
              <Printer className="w-4 h-4 text-[#F4C95D]" />
              <span>Cetak Kartu Akun Siswa (PDF)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentAccounts.map((student) => (
              <div 
                key={student.id} 
                className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-cyan-50/50 border-2 border-cyan-200/80 shadow-sm relative overflow-hidden"
              >
                <div className="flex items-center justify-between border-b border-cyan-200 pb-2 mb-2.5">
                  <span className="text-[10px] font-black uppercase text-[#123B67] tracking-wider">
                    KARTU LOGIN SBLE
                  </span>
                  <span className="text-[10px] font-semibold text-cyan-800">
                    IPA SMP Lampung
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="font-extrabold text-slate-900 text-sm">{student.name}</div>
                  <div className="text-[11px] text-slate-600">{student.className} • {student.school}</div>
                  <div className="pt-2 border-t border-slate-200 mt-2 space-y-1 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Username/NISN:</span>
                      <strong className="text-[#123B67]">{student.username}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Kata Sandi:</span>
                      <strong className="text-emerald-700">{student.password}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-3 text-[9px] text-slate-400 italic text-center">
                  Simpan kartu ini dengan baik untuk login praktikum mandiri.
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: OBSERVE SCIENTIFIC ATTITUDE */}
      {gradingStudent && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2E8B57]">
                  Asesmen Autentik Pendidik
                </span>
                <h3 className="text-lg font-black text-[#123B67]">
                  Lembar Observasi Sikap Ilmiah: {gradingStudent.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {gradingStudent.className} • Skala 1 (Kurang) sampai 4 (Sangat Baik / Membudaya)
                </p>
              </div>
              <button
                onClick={() => setGradingStudent(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {gradeSaveSuccess && (
              <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Penilaian sikap ilmiah berhasil disimpan ke portofolio siswa!
              </div>
            )}

            <div className="space-y-3.5">
              {SIKAP_ILMIAH_INDICATORS.map((ind) => {
                const currentRating = (tempObservation as any)[ind.id] || 3;

                return (
                  <div key={ind.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{ind.name}</div>
                        <div className="text-[11px] text-slate-500">{ind.teacherObservationPoint}</div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setTempObservation({ ...tempObservation, [ind.id]: star })}
                            className={`w-8 h-8 rounded-lg text-xs font-bold border transition ${
                              currentRating === star
                                ? 'bg-[#2E8B57] text-white border-emerald-600 shadow'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {star}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Catatan Anekdot & Evaluasi Perilaku Guru:
                </label>
                <textarea
                  value={tempObservation.notes}
                  onChange={(e) => setTempObservation({ ...tempObservation, notes: e.target.value })}
                  placeholder="Tuliskan catatan khusus mengenai ketelitian, kejujuran mencatat data, atau keaktifan investigasi siswa..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setGradingStudent(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveObservation}
                className="px-5 py-2 rounded-xl bg-[#2E8B57] hover:bg-emerald-700 text-white font-bold text-xs shadow"
              >
                Simpan Penilaian Observasi Guru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FULL STUDENT PORTFOLIO VIEW */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 bg-slate-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#168AAD]">
                  Rapor Portofolio Individual
                </span>
                <h3 className="text-lg font-black text-[#123B67]">
                  {selectedStudentForModal.name}
                </h3>
                <p className="text-xs text-slate-500">
                  NISN: {selectedStudentForModal.username} • {selectedStudentForModal.className} • {selectedStudentForModal.school}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content summary */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <div className="text-[10px] text-slate-500 uppercase font-bold">Progres Modul</div>
                <div className="text-xl font-black text-[#123B67] mt-1">
                  {selectedStudentForModal.studentData?.progressPercent || 0}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
                <div className="text-[10px] text-amber-800 uppercase font-bold">Berpikir Kritis</div>
                <div className="text-xl font-black text-amber-600 mt-1">
                  {Object.values(selectedStudentForModal.studentData?.criticalThinkingScores || {}).filter((x) => x.isCorrect).length}/6
                </div>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="text-[10px] text-emerald-800 uppercase font-bold">Evaluasi Akhir</div>
                <div className="text-xl font-black text-[#2E8B57] mt-1">
                  {Object.values(selectedStudentForModal.studentData?.evaluationScores || {}).filter((x) => x.isCorrect).length * 10}/100
                </div>
              </div>
            </div>

            {/* Problem Orientation Answers */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#123B67]">Jawaban Orientasi Masalah Awal:</h4>
              <p className="text-xs text-slate-600">
                1. {selectedStudentForModal.studentData?.problemAnswers?.q1 || '-'}<br />
                2. {selectedStudentForModal.studentData?.problemAnswers?.q2 || '-'}<br />
                3. {selectedStudentForModal.studentData?.problemAnswers?.q3 || '-'}
              </p>
            </div>

            {/* Investigation & Trials */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#123B67]">Uji Coba Virtual Lab & Hipotesis:</h4>
              <p className="text-xs text-slate-600">
                <strong>Hipotesis:</strong> {selectedStudentForModal.studentData?.investigation?.hypothesis || 'Belum dirumuskan.'}
              </p>
              <div className="text-xs text-slate-600">
                <strong>Jumlah Percobaan Tercatat:</strong> {selectedStudentForModal.studentData?.trials?.length || 0} Percobaan
              </div>
            </div>

            {/* Deep Learning Reflection */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-[#123B67]">Refleksi Deep Learning:</h4>
              <p className="text-xs text-slate-600 italic">
                "{selectedStudentForModal.studentData?.reflection?.meaningfulNotes || 'Belum ada catatan refleksi.'}"
              </p>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => onEnterStudentMode(selectedStudentForModal)}
                className="px-4 py-2 rounded-xl bg-[#168AAD] hover:bg-cyan-600 text-white font-bold text-xs shadow transition"
              >
                Masuk ke Sesi Belajar Siswa Ini
              </button>

              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
