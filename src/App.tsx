import React, { useState, useEffect } from 'react';
import { 
  ActiveMenu, 
  StudentProfile, 
  LabTrial, 
  ProblemOrientationAnswer, 
  InvestigationData, 
  CriticalThinkingScore, 
  EvaluationScore, 
  ScientificAttitudeSelfAssessment, 
  ScientificAttitudeTeacherObservation, 
  DeepLearningReflection,
  UserAccount 
} from './types/index.ts';

import { 
  loadCurrentUser, 
  saveCurrentUser, 
  updateStudentData, 
  DEFAULT_ACCOUNTS,
  authenticateUser 
} from './utils/authStore.ts';

import { Header } from './components/Header.tsx';
import { Navigation, MENU_ITEMS } from './components/Navigation.tsx';
import { Footer } from './components/Footer.tsx';

// Views
import { LoginView } from './components/views/LoginView.tsx';
import { GuruDashboardView } from './components/views/GuruDashboardView.tsx';
import { BerandaView } from './components/views/BerandaView.tsx';
import { PetunjukView } from './components/views/PetunjukView.tsx';
import { CapaianView } from './components/views/CapaianView.tsx';
import { FenomenaView } from './components/views/FenomenaView.tsx';
import { OrientasiMasalahView } from './components/views/OrientasiMasalahView.tsx';
import { MateriView } from './components/views/MateriView.tsx';
import { InvestigasiView } from './components/views/InvestigasiView.tsx';
import { VirtualLabView } from './components/views/VirtualLabView.tsx';
import { AnalisisDataView } from './components/views/AnalisisDataView.tsx';
import { BerpikirKritisView } from './components/views/BerpikirKritisView.tsx';
import { SikapIlmiahView } from './components/views/SikapIlmiahView.tsx';
import { EvaluasiView } from './components/views/EvaluasiView.tsx';
import { RefleksiView } from './components/views/RefleksiView.tsx';
import { DashboardView } from './components/views/DashboardView.tsx';
import { ProfilPengembangView } from './components/views/ProfilPengembangView.tsx';

export default function App() {
  // Current logged in user
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    // Check url search params for autostart
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autostart') === '1') {
      const user = authenticateUser('guru.adhitya', 'guru123');
      return user;
    }
    return loadCurrentUser();
  });

  // Flag if teacher is previewing student learning environment
  const [isTeacherInStudentView, setIsTeacherInStudentView] = useState<boolean>(false);

  // Navigation
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>('beranda');
  const [is16x9Fixed, setIs16x9Fixed] = useState<boolean>(true);

  // Student Profile
  const [student, setStudent] = useState<StudentProfile>({
    name: 'Siswa Peneliti SMP',
    className: 'Kelas IX IPA',
    school: 'SMP Negeri di Provinsi Lampung',
    studentId: '1234567890',
  });

  // Track completed menus
  const [completedMenus, setCompletedMenus] = useState<Set<ActiveMenu>>(
    new Set(['beranda'])
  );

  // Problem Orientation
  const [problemAnswers, setProblemAnswers] = useState<ProblemOrientationAnswer>({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
  });

  // Investigation Worksheet
  const [investigation, setInvestigation] = useState<InvestigationData>({
    problemIdentification: '',
    researchQuestion: '',
    independentVar: '',
    dependentVar: '',
    controlVars: '',
    hypothesis: '',
    evidenceArg: '',
    conclusion: '',
    limitations: '',
  });

  // Lab Trials
  const [trials, setTrials] = useState<LabTrial[]>([]);

  // Critical Thinking
  const [criticalThinkingScores, setCriticalThinkingScores] = useState<CriticalThinkingScore>({});

  // Evaluation
  const [evaluationScores, setEvaluationScores] = useState<EvaluationScore>({});

  // Scientific Attitude Self
  const [selfAssessment, setSelfAssessment] = useState<ScientificAttitudeSelfAssessment>({
    curiosity: 3,
    accuracy: 3,
    objectivity: 3,
    openness: 3,
    honesty: 4,
    responsibility: 3,
    notes: '',
  });

  // Scientific Attitude Teacher
  const [teacherObservation, setTeacherObservation] = useState<ScientificAttitudeTeacherObservation>({
    curiosity: 3,
    accuracy: 3,
    objectivity: 3,
    openness: 3,
    honesty: 4,
    responsibility: 3,
    teacherName: 'Adhitya Seiptiariny, S.Pd.',
    notes: 'Siswa menunjukkan antusiasme tinggi dalam melakukan simulasi variabel Virtual Lab.',
  });

  // Reflection Deep Learning
  const [reflection, setReflection] = useState<DeepLearningReflection>({
    mindfulNotes: '',
    meaningfulNotes: '',
    joyfulNotes: '',
  });

  // When currentUser changes (e.g. login as student or teacher), initialize state
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'siswa' && currentUser.studentData) {
        const d = currentUser.studentData;
        setStudent({
          name: currentUser.name,
          className: currentUser.className || 'Kelas IX IPA',
          school: currentUser.school,
          studentId: currentUser.nisn || currentUser.username,
        });
        if (d.completedMenus && d.completedMenus.length > 0) {
          setCompletedMenus(new Set(d.completedMenus));
        }
        if (d.problemAnswers) setProblemAnswers(d.problemAnswers);
        if (d.investigation) setInvestigation(d.investigation);
        if (d.trials) setTrials(d.trials);
        if (d.criticalThinkingScores) setCriticalThinkingScores(d.criticalThinkingScores);
        if (d.evaluationScores) setEvaluationScores(d.evaluationScores);
        if (d.selfAssessment) setSelfAssessment(d.selfAssessment);
        if (d.teacherObservation) setTeacherObservation(d.teacherObservation);
        if (d.reflection) setReflection(d.reflection);
      } else if (currentUser.role === 'guru') {
        setStudent({
          name: currentUser.name,
          className: 'Guru Pengampu IPA',
          school: currentUser.school,
          studentId: currentUser.nip || 'GURU-IPA',
        });
      }
    }
  }, [currentUser]);

  // Sync state changes back to student record if logged in as student
  useEffect(() => {
    if (currentUser && currentUser.role === 'siswa') {
      updateStudentData(currentUser.id, {
        progressPercent: Math.min(100, Math.round((completedMenus.size / MENU_ITEMS.length) * 100)),
        completedMenus: Array.from(completedMenus),
        trials,
        problemAnswers,
        investigation,
        criticalThinkingScores,
        evaluationScores,
        selfAssessment,
        teacherObservation,
        reflection,
      });
    }
  }, [
    currentUser,
    completedMenus,
    trials,
    problemAnswers,
    investigation,
    criticalThinkingScores,
    evaluationScores,
    selfAssessment,
    teacherObservation,
    reflection,
  ]);

  // Mark menu completed when visited
  useEffect(() => {
    setCompletedMenus((prev) => {
      const next = new Set(prev);
      next.add(activeMenu);
      return next;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeMenu]);

  // Handle Login Success
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    saveCurrentUser(user);
    setIsTeacherInStudentView(false);
    setActiveMenu('beranda');
  };

  // Handle Logout
  const handleLogout = () => {
    setCurrentUser(null);
    saveCurrentUser(null);
    setIsTeacherInStudentView(false);
    setActiveMenu('beranda');
  };

  // Teacher entering student view
  const handleEnterStudentMode = (studentAccount?: UserAccount) => {
    if (studentAccount && studentAccount.studentData) {
      const d = studentAccount.studentData;
      setStudent({
        name: studentAccount.name,
        className: studentAccount.className || 'Kelas IX IPA',
        school: studentAccount.school,
        studentId: studentAccount.nisn || studentAccount.username,
      });
      setCompletedMenus(new Set(d.completedMenus || ['beranda']));
      if (d.problemAnswers) setProblemAnswers(d.problemAnswers);
      if (d.investigation) setInvestigation(d.investigation);
      if (d.trials) setTrials(d.trials);
      if (d.criticalThinkingScores) setCriticalThinkingScores(d.criticalThinkingScores);
      if (d.evaluationScores) setEvaluationScores(d.evaluationScores);
      if (d.selfAssessment) setSelfAssessment(d.selfAssessment);
      if (d.teacherObservation) setTeacherObservation(d.teacherObservation);
      if (d.reflection) setReflection(d.reflection);
    } else {
      setStudent({
        name: `${currentUser?.name} (Mode Pratinjau)`,
        className: 'Fasilitator IPA',
        school: currentUser?.school || 'SMP Lampung',
        studentId: 'GURU-PREVIEW',
      });
    }
    setIsTeacherInStudentView(true);
    setActiveMenu('beranda');
  };

  const handleReturnToTeacherDashboard = () => {
    setIsTeacherInStudentView(false);
  };

  // Progress metrics
  const totalModules = MENU_ITEMS.length; // 15
  const completedCount = completedMenus.size;
  const progressPercent = Math.min(100, Math.round((completedCount / totalModules) * 100));

  const handleResetAllData = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset data pembelajaran sesi ini?')) {
      setTrials([]);
      setProblemAnswers({ q1: '', q2: '', q3: '', q4: '' });
      setInvestigation({
        problemIdentification: '',
        researchQuestion: '',
        independentVar: '',
        dependentVar: '',
        controlVars: '',
        hypothesis: '',
        evidenceArg: '',
        conclusion: '',
        limitations: '',
      });
      setCriticalThinkingScores({});
      setEvaluationScores({});
      setReflection({ mindfulNotes: '', meaningfulNotes: '', joyfulNotes: '' });
      setCompletedMenus(new Set(['beranda']));
      setActiveMenu('beranda');
    }
  };

  // 1. IF NOT LOGGED IN: Render Initial Login View
  if (!currentUser) {
    return <LoginView onLoginSuccess={handleLoginSuccess} />;
  }

  // 2. IF GURU AND NOT IN PREVIEW MODE: Render Teacher Portal
  if (currentUser.role === 'guru' && !isTeacherInStudentView) {
    return (
      <div className="min-h-screen bg-[#07192c] text-slate-800 flex flex-col antialiased">
        <main className="flex-1 w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
          <GuruDashboardView
            currentUser={currentUser}
            onLogout={handleLogout}
            onEnterStudentMode={handleEnterStudentMode}
          />
        </main>
        <footer className="bg-[#0c233c] text-white border-t border-cyan-900/40 py-4 px-4 text-center text-xs text-slate-400">
          Smart Bio-Learning Environment (SBLE) • Portal Khusus Guru Pengampu • Tesis Magister Pendidikan Sains
        </footer>
      </div>
    );
  }

  // 3. STUDENT LEARNING ENVIRONMENT (15 Modules) - Available to Students and Teachers in Preview Mode
  return (
    <div className="min-h-screen bg-[#07192c] text-slate-800 flex flex-col antialiased selection:bg-[#168AAD] selection:text-white">
      {/* Fixed Header with Role & Logout */}
      <Header
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        student={student}
        progressPercent={progressPercent}
        completedCount={completedCount}
        totalModules={totalModules}
        is16x9Fixed={is16x9Fixed}
        setIs16x9Fixed={setIs16x9Fixed}
        currentUser={currentUser}
        onLogout={handleLogout}
        onReturnToTeacherDashboard={currentUser.role === 'guru' ? handleReturnToTeacherDashboard : undefined}
      />

      {/* 15-item Navigation Bar */}
      <Navigation
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        completedMenus={completedMenus}
      />

      {/* Main Content Arena with 16:9 Aspect Ratio Envelope */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
        <div className={`w-full transition-all duration-300 ${is16x9Fixed ? 'max-w-[1720px] mx-auto' : ''}`}>
          {activeMenu === 'beranda' && (
            <BerandaView
              setActiveMenu={setActiveMenu}
              progressPercent={progressPercent}
              student={student}
              setStudent={setStudent}
            />
          )}

          {activeMenu === 'petunjuk' && (
            <PetunjukView setActiveMenu={setActiveMenu} />
          )}

          {activeMenu === 'capaian' && (
            <CapaianView setActiveMenu={setActiveMenu} />
          )}

          {activeMenu === 'fenomena' && (
            <FenomenaView setActiveMenu={setActiveMenu} />
          )}

          {activeMenu === 'masalah' && (
            <OrientasiMasalahView
              setActiveMenu={setActiveMenu}
              answers={problemAnswers}
              setAnswers={setProblemAnswers}
            />
          )}

          {activeMenu === 'materi' && (
            <MateriView setActiveMenu={setActiveMenu} />
          )}

          {activeMenu === 'investigasi' && (
            <InvestigasiView
              setActiveMenu={setActiveMenu}
              investigation={investigation}
              setInvestigation={setInvestigation}
            />
          )}

          {activeMenu === 'virtuallab' && (
            <VirtualLabView
              setActiveMenu={setActiveMenu}
              trials={trials}
              setTrials={setTrials}
            />
          )}

          {activeMenu === 'analisis' && (
            <AnalisisDataView
              setActiveMenu={setActiveMenu}
              trials={trials}
              setTrials={setTrials}
            />
          )}

          {activeMenu === 'berpikir-kritis' && (
            <BerpikirKritisView
              setActiveMenu={setActiveMenu}
              scores={criticalThinkingScores}
              setScores={setCriticalThinkingScores}
            />
          )}

          {activeMenu === 'sikap-ilmiah' && (
            <SikapIlmiahView
              setActiveMenu={setActiveMenu}
              selfAssessment={selfAssessment}
              setSelfAssessment={setSelfAssessment}
              teacherObservation={teacherObservation}
              setTeacherObservation={setTeacherObservation}
            />
          )}

          {activeMenu === 'evaluasi' && (
            <EvaluasiView
              setActiveMenu={setActiveMenu}
              scores={evaluationScores}
              setScores={setEvaluationScores}
            />
          )}

          {activeMenu === 'refleksi' && (
            <RefleksiView
              setActiveMenu={setActiveMenu}
              reflection={reflection}
              setReflection={setReflection}
            />
          )}

          {activeMenu === 'dashboard' && (
            <DashboardView
              setActiveMenu={setActiveMenu}
              student={student}
              setStudent={setStudent}
              progressPercent={progressPercent}
              completedCount={completedCount}
              totalModules={totalModules}
              trials={trials}
              criticalThinkingScores={criticalThinkingScores}
              evaluationScores={evaluationScores}
              selfAssessment={selfAssessment}
              teacherObservation={teacherObservation}
              reflection={reflection}
              investigation={investigation}
              onResetAllData={handleResetAllData}
            />
          )}

          {activeMenu === 'profil' && (
            <ProfilPengembangView setActiveMenu={setActiveMenu} />
          )}
        </div>
      </main>

      {/* Footer Navigation & Copyright */}
      <Footer activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
    </div>
  );
}
