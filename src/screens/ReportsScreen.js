import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemedStyles } from '../theme/useThemedStyles';

function createStyles(colors) {
    return StyleSheet.create({
        container: {
            flex: 1,
        },

        title: {
            fontSize: 32,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 6,
        },

        subtitle: {
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: 32,
        },

        statsRow: {
            flexDirection: 'row',
            gap: 16,
            marginBottom: 32,
        },

        statCard: {
            flex: 1,
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
        },

        statNumber: {
            fontSize: 28,
            fontWeight: '700',
            color: colors.text,
            marginTop: 10,
        },

        statLabel: {
            color: colors.textSecondary,
            marginTop: 4,
        },

        sectionTitle: {
            fontSize: 22,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 20,
        },

        reportCard: {
            backgroundColor: colors.surface,
            borderRadius: 16,
            padding: 18,
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderWidth: 1,
            borderColor: colors.border,
        },

        reportText: {
            fontSize: 16,
            fontWeight: '600',
            color: colors.text,
        },
    });
}

export default function ReportsScreen() {
    const styles = useThemedStyles(createStyles);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Relatórios</Text>
            <Text style={styles.subtitle}>
                Visualize estatísticas e relatórios da biblioteca.
            </Text>

            <View style={styles.statsRow}>
                <View style={styles.statCard}>
                    <Ionicons name="library-outline" size={24} />
                    <Text style={styles.statNumber}>1250</Text>
                    <Text style={styles.statLabel}>Livros</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="people-outline" size={24} />
                    <Text style={styles.statNumber}>540</Text>
                    <Text style={styles.statLabel}>Alunos</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="repeat-outline" size={24} />
                    <Text style={styles.statNumber}>82</Text>
                    <Text style={styles.statLabel}>Empréstimos</Text>
                </View>

                <View style={styles.statCard}>
                    <Ionicons name="alert-circle-outline" size={24} />
                    <Text style={styles.statNumber}>7</Text>
                    <Text style={styles.statLabel}>Atrasados</Text>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Relatórios Disponíveis</Text>

            <View style={styles.reportCard}>
                <Ionicons name="book-outline" size={22} />
                <Text style={styles.reportText}>Livros Mais Emprestados</Text>
            </View>

            <View style={styles.reportCard}>
                <Ionicons name="people-outline" size={22} />
                <Text style={styles.reportText}>Alunos Mais Ativos</Text>
            </View>

            <View style={styles.reportCard}>
                <Ionicons name="bar-chart-outline" size={22} />
                <Text style={styles.reportText}>Empréstimos por Mês</Text>
            </View>

            <View style={styles.reportCard}>
                <Ionicons name="document-text-outline" size={22} />
                <Text style={styles.reportText}>Exportar PDF</Text>
            </View>
        </View>
    );
}