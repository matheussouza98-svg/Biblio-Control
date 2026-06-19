const AVATAR_COLORS = [
  '#1A7A3C', '#15803D', '#E8750A', '#7C3AED', '#DC2626',
  '#0891B2', '#BE185D', '#CA8A04', '#059669', '#9333EA',
  '#2563EB', '#D97706', '#0D9488', '#E11D48', '#4F46E5',
];

const FIRST_NAMES = [
  'Ana', 'Bruno', 'Carla', 'Daniel', 'Elena', 'Felipe', 'Gabriela', 'Henrique',
  'Isabela', 'João', 'Karina', 'Lucas', 'Mariana', 'Nicolas', 'Olivia', 'Pedro',
  'Raquel', 'Samuel', 'Tatiana', 'Vinícius', 'Amanda', 'Bernardo', 'Camila', 'Diego',
  'Fernanda', 'Gustavo', 'Helena', 'Igor', 'Juliana', 'Kauã', 'Larissa', 'Mateus',
  'Natália', 'Otávio', 'Patrícia', 'Rafael', 'Sabrina', 'Thiago', 'Úrsula', 'Wesley',
  'Yasmin', 'Adriano', 'Bianca', 'Caio', 'Débora', 'Eduardo', 'Flávia', 'Guilherme',
  'Ingrid', 'Jéssica', 'Kleber', 'Letícia', 'Maurício', 'Nádia', 'Oscar', 'Priscila',
  'Renato', 'Simone', 'Tales', 'Vanessa', 'William', 'Alice', 'Brenda', 'César',
  'Daiane', 'Elisa', 'Fabiano', 'Gisele', 'Hugo', 'Ivan', 'Joana', 'Kelly',
  'Leandro', 'Michele', 'Nelson', 'Paula', 'Ricardo', 'Sandra', 'Tomás', 'Viviane',
  'André', 'Beatriz', 'Cristiano', 'Denise', 'Emerson', 'Franciele', 'George', 'Hellen',
  'Ivanildo', 'Jaqueline', 'Kevin', 'Lorena', 'Marcelo', 'Neusa', 'Osvaldo', 'Quitéria',
  'Robson', 'Silvana', 'Tainá', 'Valéria', 'Xavier', 'Zilda', 'Aline', 'Benício',
  'Cláudia', 'Douglas', 'Estela', 'Fabíola', 'Genival', 'Humberto', 'Iracema', 'Jonas',
  'Kátia', 'Luan', 'Márcia', 'Norberto', 'Orlando', 'Penélope', 'Quirino', 'Rosana',
  'Sérgio', 'Teresa', 'Ulisses', 'Vitor', 'Wagner', 'Xênia', 'Yuri', 'Zélia',
  'Abigail', 'Baltazar', 'Cintia', 'Domingos', 'Emanuel', 'Filomena', 'Gilberto', 'Heitor',
  'Ivana', 'Joaquim', 'Kamila', 'Lívia', 'Manoel', 'Noemi', 'Odete', 'Plínio',
  'Regina', 'Sueli', 'Tadeu', 'Umberto', 'Verônica', 'Wallace', 'Yara', 'Zacarias',
];

const LAST_NAMES = [
  'Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira',
  'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes',
  'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Nascimento', 'Araújo',
  'Melo', 'Cardoso', 'Reis', 'Correia', 'Moura', 'Teixeira', 'Freitas', 'Monteiro',
  'Cavalcanti', 'Campos', 'Andrade', 'Moreira', 'Nunes', 'Machado', 'Mendes', 'Barros',
  'Castro', 'Pinto', 'Cunha', 'Farias', 'Azevedo', 'Miranda', 'Duarte', 'Ramos',
  'Batista', 'Fonseca', 'Macedo', 'Tavares', 'Guimarães', 'Borges', 'Peixoto', 'Xavier',
  'Assis', 'Coelho', 'Viana', 'Brito', 'Paiva', 'Queiroz', 'Siqueira', 'Leite',
  'Medeiros', 'Aguiar', 'Neves', 'Figueiredo', 'Matos', 'Bento', 'Cordeiro', 'Amaral',
];

const TURMAS = [
  { class: '1° Administração', course: 'Administração', count: 15 },
  { class: '2° Administração', course: 'Administração', count: 15 },
  { class: '3° Administração', course: 'Administração', count: 15 },
  { class: '1° Desenvolvimento de Sistema', course: 'Desenvolvimento de Sistema', count: 15 },
  { class: '2° Desenvolvimento de Sistema', course: 'Desenvolvimento de Sistema', count: 15 },
  { class: '3° Desenvolvimento de Sistema', course: 'Desenvolvimento de Sistema', count: 15 },
  { class: '1° Edificações', course: 'Edificações', count: 15 },
  { class: '2° Edificações', course: 'Edificações', count: 15 },
  { class: '3° Edificações', course: 'Edificações', count: 15 },
  { class: '1° Massoterapia', course: 'Massoterapia', count: 15 },
  { class: '2° Massoterapia', course: 'Massoterapia', count: 15 },
  { class: '3° Massoterapia', course: 'Massoterapia', count: 15 },
];

export const CLASS_OPTIONS = TURMAS.map(({ class: turma }) => turma);

function buildName(index) {
  const first = FIRST_NAMES[index % FIRST_NAMES.length];
  const last1 = LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];
  const last2 = LAST_NAMES[(index + 7) % LAST_NAMES.length];
  return `${first} ${last1} ${last2}`;
}

export function generateStudents() {
  const students = [];
  let id = 1;

  TURMAS.forEach((turma, turmaIndex) => {
    for (let i = 0; i < turma.count; i++) {
      const globalIndex = turmaIndex * turma.count + i;
      students.push({
        id: String(id),
        name: buildName(globalIndex),
        registration: `2026${String(id).padStart(4, '0')}`,
        class: turma.class,
        course: turma.course,
        avatarColor: AVATAR_COLORS[globalIndex % AVATAR_COLORS.length],
      });
      id += 1;
    }
  });

  return students;
}

export const turmas = TURMAS.map(({ class: turma, course, count }) => ({
  turma,
  course,
  count,
  totalCourse: 45,
}));

export const coursesSummary = [
  { course: 'Administração', total: 45, turmas: ['1°', '2°', '3°'] },
  { course: 'Desenvolvimento de Sistema', total: 45, turmas: ['1°', '2°', '3°'] },
  { course: 'Edificações', total: 45, turmas: ['1°', '2°', '3°'] },
  { course: 'Massoterapia', total: 45, turmas: ['1°', '2°', '3°'] },
];
