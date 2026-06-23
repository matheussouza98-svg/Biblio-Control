import { generateStudents } from './generateStudents';

export const stats = {
  totalBooks: 1250,
  availableBooks: 950,
  borrowedBooks: 300,
  totalStudents: 180,
  borrowsToday: 15,
  returnsToday: 8,
};

export const students = generateStudents();

const formatDate = (date) => {
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = date.getFullYear();

  return `${dia}/${mes}/${ano}`;
};

const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return formatDate(date);
};

export const recentBorrows = [
  {
    id: '1',
    bookTitle: 'Dom Casmurro',
    studentName: students[0].name,
    turma: '1º Ano',
    curso: 'Administração',
    borrowDate: addDays(-5),
    returnDate: addDays(9),
    status: 'borrowed',
    coverColor: '#1A7A3C',
  },

  {
    id: '2',
    bookTitle: 'O Pequeno Príncipe',
    studentName: students[10].name,
    turma: '2º Ano',
    curso: 'Administração',
    borrowDate: addDays(-20),
    returnDate: addDays(-6),
    status: 'overdue',
    coverColor: '#EA580C',
  },

  {
    id: '3',
    bookTitle: '1984',
    studentName: students[20].name,
    turma: '3º Ano',
    curso: 'Administração',
    borrowDate: addDays(-18),
    returnDate: addDays(-4),
    status: 'returned',
    coverColor: '#16A34A',
  },

  {
    id: '4',
    bookTitle: 'Capitães da Areia',
    studentName: students[30].name,
    turma: '1º Ano',
    curso: 'Desenvolvimento de Sistema',
    borrowDate: addDays(-4),
    returnDate: addDays(10),
    status: 'borrowed',
    coverColor: '#DC2626',
  },

  {
    id: '5',
    bookTitle: 'A Moreninha',
    studentName: students[40].name,
    turma: '2º Ano',
    curso: 'Desenvolvimento de Sistema',
    borrowDate: addDays(-15),
    returnDate: addDays(-2),
    status: 'returned',
    coverColor: '#7C3AED',
  },

  {
    id: '6',
    bookTitle: 'Memórias Póstumas',
    studentName: students[50].name,
    turma: '3º Ano',
    curso: 'Desenvolvimento de Sistema',
    borrowDate: addDays(-3),
    returnDate: addDays(11),
    status: 'borrowed',
    coverColor: '#0EA5E9',
  },

  {
    id: '7',
    bookTitle: 'Vidas Secas',
    studentName: students[60].name,
    turma: '1º Ano',
    curso: 'Edificações',
    borrowDate: addDays(-2),
    returnDate: addDays(12),
    status: 'borrowed',
    coverColor: '#F59E0B',
  },

  {
    id: '8',
    bookTitle: 'Iracema',
    studentName: students[70].name,
    turma: '2º Ano',
    curso: 'Edificações',
    borrowDate: addDays(-16),
    returnDate: addDays(-3),
    status: 'returned',
    coverColor: '#8B5CF6',
  },

  {
    id: '9',
    bookTitle: 'Senhora',
    studentName: students[80].name,
    turma: '3º Ano',
    curso: 'Edificações',
    borrowDate: addDays(-25),
    returnDate: addDays(-8),
    status: 'overdue',
    coverColor: '#EF4444',
  },

  {
    id: '10',
    bookTitle: 'O Cortiço',
    studentName: students[90].name,
    turma: '1º Ano',
    curso: 'Massoterapia',
    borrowDate: addDays(-1),
    returnDate: addDays(13),
    status: 'borrowed',
    coverColor: '#22C55E',
  },

  {
    id: '11',
    bookTitle: 'Macunaíma',
    studentName: students[100].name,
    turma: '2º Ano',
    curso: 'Massoterapia',
    borrowDate: addDays(-17),
    returnDate: addDays(-5),
    status: 'returned',
    coverColor: '#F97316',
  },

  {
    id: '12',
    bookTitle: 'O Alienista',
    studentName: students[110].name,
    turma: '3º Ano',
    curso: 'Massoterapia',
    borrowDate: addDays(-6),
    returnDate: addDays(8),
    status: 'borrowed',
    coverColor: '#14B8A6',
  },
];

export const settingsSections = [
  {
    title: 'Gerenciamento',
    items: [
      { id: 'categories', label: 'Categorias', icon: 'folder-outline', description: 'Gerenciar categorias de livros' },
      { id: 'rooms', label: 'Salas / Turmas', icon: 'school-outline', description: 'Cadastro de salas e turmas' },
      { id: 'users', label: 'Usuários', icon: 'people-outline', description: 'Controle de acesso ao sistema' },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { id: 'backup', label: 'Backup', icon: 'cloud-upload-outline', description: 'Exportar e importar dados' },
      { id: 'config', label: 'Configurações', icon: 'settings-outline', description: 'Preferências do sistema' },
      { id: 'about', label: 'Sobre', icon: 'information-circle-outline', description: 'Versão 1.0.0 — SAM BIBLIOTECA' },
    ],
  },
];
