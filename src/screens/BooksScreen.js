import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import BookCard from '../components/BookCard';
import RegisterBookScreen from './RegisterBookScreen';

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'available', label: 'Disponíveis' },
  { id: 'borrowed', label: 'Emprestados' },
];

export default function BooksScreen({ books, onAddBook, onNavigate }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showRegister, setShowRegister] = useState(false);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const isFullyAvailable = book.available === book.quantity;
      const hasBorrowed = book.available < book.quantity;
      const matchesFilter = 
        filter === 'all' || 
        (filter === 'available' && isFullyAvailable) ||
        (filter === 'borrowed' && hasBorrowed);
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.code.toLowerCase().includes(query) ||
        book.barcode.includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [books, search, filter]);

  if (showRegister) {
    return (
      <RegisterBookScreen
        onBack={() => setShowRegister(false)}
        onSave={onAddBook}
      />
    );
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Livros"
        subtitle={`${filteredBooks.length} livro(s) cadastrados.`}
        actionLabel="Cadastrar Livros"
        actionIcon="add-circle-outline"
        onAction={() => setShowRegister(true)}
      />

      <View style={styles.toolbar}>
        <SearchBar
          placeholder="Buscar por título, autor, código..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.filters}>
        <FilterChips filters={FILTERS} activeFilter={filter} onFilterChange={setFilter} />
      </View>

      <View style={styles.grid}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onPress={(b) => onNavigate('bookDetail', { bookId: b.id })}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  toolbar: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  filters: {
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
});
