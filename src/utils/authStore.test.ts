import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  authenticateUser, 
  addStudentAccount, 
  loadAccounts, 
  DEFAULT_ACCOUNTS,
  INITIAL_STUDENT_DATA_FACTORY
} from './authStore.ts';

// Mock localStorage for Node test environment
const mockStorage: Record<string, string> = {};
(global as any).localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, val: string) => { mockStorage[key] = val; },
  removeItem: (key: string) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); },
};

test('Default accounts load correctly with Guru and Siswa', () => {
  const accounts = loadAccounts();
  assert.ok(accounts.length >= 4, 'Should load at least 4 default accounts');
  
  const guru = accounts.find(a => a.role === 'guru');
  assert.ok(guru, 'Should have a teacher account');
  assert.equal(guru?.username, 'guru.adhitya');

  const siswa = accounts.find(a => a.role === 'siswa');
  assert.ok(siswa, 'Should have at least one student account');
});

test('authenticateUser succeeds with correct credentials and fails with wrong ones', () => {
  const teacher = authenticateUser('guru.adhitya', 'guru123');
  assert.ok(teacher, 'Teacher should log in successfully');
  assert.equal(teacher?.role, 'guru');

  const student = authenticateUser('0081234567', 'siswa123');
  assert.ok(student, 'Student should log in successfully');
  assert.equal(student?.role, 'siswa');

  const invalid = authenticateUser('nonexistent', 'wrongpass');
  assert.equal(invalid, null, 'Invalid credentials should return null');
});

test('addStudentAccount creates a new student with initialized learning data', () => {
  const newStudent = addStudentAccount({
    name: 'Dewi Lestari',
    nisn: '0085544332',
    className: 'Kelas IX-C',
    school: 'SMP Negeri 1 Bandar Lampung',
    password: 'password123',
  });

  assert.equal(newStudent.name, 'Dewi Lestari');
  assert.equal(newStudent.username, '0085544332');
  assert.equal(newStudent.role, 'siswa');
  assert.ok(newStudent.studentData, 'Student data must be initialized');
  assert.equal(newStudent.studentData?.progressPercent, 7);

  // Authenticate with new credentials
  const auth = authenticateUser('0085544332', 'password123');
  assert.ok(auth, 'Newly created student must be able to log in');
});
