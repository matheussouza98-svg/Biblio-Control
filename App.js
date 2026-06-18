import { useState } from 'react';
import AppLayout from './src/layout/AppLayout';
import DashboardScreen from './src/screens/DashboardScreen';
import BooksScreen from './src/screens/BooksScreen';
import BookDetailScreen from './src/screens/BookDetailScreen';
import StudentsScreen from './src/screens/StudentsScreen';
import LoansScreen from './src/screens/LoansScreen';
import SettingsScreen from './src/screens/SettingsScreen';

export default function App() {
  const [screen, setScreen] = useState('dashboard');
  const [params, setParams] = useState({});

  const navigate = (target, navParams = {}) => {
    setScreen(target);
    setParams(navParams);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={navigate} />;
      case 'books':
        return <BooksScreen onNavigate={navigate} />;
      case 'bookDetail':
        return (
          <BookDetailScreen
            book={params.book}
            onBack={() => navigate('books')}
          />
        );
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
    screen === 'bookDetail' ? 'books' : screen;

  return (
    <AppLayout activeScreen={sidebarScreen} onNavigate={navigate}>
      {renderScreen()}
    </AppLayout>
  );
}
