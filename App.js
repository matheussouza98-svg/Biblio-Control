import { useState } from 'react';
import { ThemeProvider } from './src/theme/ThemeContext';
import AppLayout from './src/layout/AppLayout';
import DashboardScreen from './src/screens/DashboardScreen';
import BooksScreen from './src/screens/BooksScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import RegisterBookScreen from './src/screens/RegisterBookScreen';
import StudentsScreen from './src/screens/StudentsScreen';
import LoansScreen from './src/screens/LoansScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { books as initialBooks } from './src/data/mockData';

const COVER_COLORS = ['#0047AB', '#EA580C', '#16A34A', '#7C3AED', '#DC2626', '#0891B2'];

function buildBookFromForm(formData, existingBook = null) {
  const quantity = parseInt(formData.quantity, 10) || 0;
  const available = parseInt(formData.available, 10) || 0;

  return {
    id: existingBook?.id ?? String(Date.now()),
    title: formData.title.trim(),
    author: formData.author.trim(),
    code: existingBook?.code ?? '',
    barcode: formData.barcode.trim(),
    publisher: formData.publisher.trim(),
    year: parseInt(formData.year, 10) || formData.year.trim(),
    category: formData.category.trim(),
    location: formData.location.trim(),
    quantity,
    available,
    status: available > 0 ? 'available' : 'borrowed',
    coverColor: existingBook?.coverColor ?? COVER_COLORS[Math.floor(Math.random() * COVER_COLORS.length)],
  };
}

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [params, setParams] = useState({});
  const [booksList, setBooksList] = useState(initialBooks);

  const navigate = (target, navParams = {}) => {
    setScreen(target);
    setParams(navParams);
  };

  const addBook = (formData) => {
    setBooksList((prev) => {
      const nextNumber = prev.length + 1;
      const newBook = buildBookFromForm(formData);
      return [
        ...prev,
        {
          ...newBook,
          code: `LIV-${String(nextNumber).padStart(3, '0')}`,
          coverColor: COVER_COLORS[nextNumber % COVER_COLORS.length],
        },
      ];
    });
  };

  const updateBook = (bookId, formData) => {
    setBooksList((prev) =>
      prev.map((book) =>
        book.id === bookId ? buildBookFromForm(formData, book) : book
      )
    );
  };

  const deleteBook = (bookId) => {
    setBooksList((prev) => prev.filter((book) => book.id !== bookId));
  };

  const getBookById = (bookId) => booksList.find((book) => book.id === bookId);

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigate} />;
      case 'books':
        return (
          <BooksScreen
            books={booksList}
            onAddBook={addBook}
            onNavigate={navigate}
          />
        );
      case 'bookDetail': {
        const book = getBookById(params.bookId);
        if (!book) {
          navigate('books');
          return null;
        }
        return (
          <BookDetailScreen
            book={book}
            onBack={() => navigate('books')}
            onEdit={(bookId) => navigate('editBook', { bookId })}
            onDelete={deleteBook}
          />
        );
      }
      case 'editBook': {
        const book = getBookById(params.bookId);
        if (!book) {
          navigate('books');
          return null;
        }
        return (
          <RegisterBookScreen
            mode="edit"
            initialBook={book}
            backLabel="Voltar para detalhes"
            onBack={() => navigate('bookDetail', { bookId: params.bookId })}
            onSave={(formData) => updateBook(params.bookId, formData)}
          />
        );
      }
      case 'students':
        return <StudentsScreen />;
      case 'loans':
        return <LoansScreen key={params.tab || 'history'} initialTab={params.tab || 'history'} />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <DashboardScreen onNavigate={navigate} />;
    }
  };

  const sidebarScreen =
    screen === 'bookDetail' || screen === 'editBook' ? 'books' : screen;

  return (
    <ThemeProvider>
      <AppLayout activeScreen={sidebarScreen} onNavigate={navigate}>
        {renderScreen()}
      </AppLayout>
    </ThemeProvider>
  );
}
