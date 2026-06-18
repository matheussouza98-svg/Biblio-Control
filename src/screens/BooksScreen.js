import { useState, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import PageHeader from '../components/PageHeader';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import BookCard from '../components/BookCard';
import { books } from '../data/mockData';

const FILTERS = [
  { id: 'all', label: 'Todos' },
  { id: 'available', label: 'Disponíveis' },
  { id: 'borrowed', label: 'Emprestados' },
];

export default function BooksScreen({ onNavigate }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesFilter = filter === 'all' || book.status === filter;
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.code.toLowerCase().includes(query) ||
        book.barcode.includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  return (
    <View>
      <PageHeader
        title="Livros"
        subtitle={`${filteredBooks.length} livro(s) encontrado(s)`}
        actionLabel="Adicionar Livro"
        actionIcon="add-outline"
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
            onPress={(b) => onNavigate('bookDetail', { book: b })}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
